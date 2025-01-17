import React, { useMemo, useCallback } from 'react'

import * as RD from '@devexperts/remote-data-ts'
import { THORChain } from '@xchainjs/xchain-util'
import * as A from 'fp-ts/Array'
import * as FP from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { useObservableState } from 'observable-hooks'
import * as Rx from 'rxjs'
import * as RxOp from 'rxjs/operators'

import { WalletAddress, WalletAddresses } from '../../../../shared/wallet/types'
import { PoolActionsHistory } from '../../../components/poolActionsHistory'
import { historyFilterToViewblockFilter } from '../../../components/poolActionsHistory/PoolActionsHistory.helper'
import { Filter } from '../../../components/poolActionsHistory/types'
import { WalletPoolActionsHistoryHeader } from '../../../components/poolActionsHistory/WalletPoolActionsHistoryHeader'
import { useChainContext } from '../../../contexts/ChainContext'
import { useWalletContext } from '../../../contexts/WalletContext'
import { eqString } from '../../../helpers/fp/eq'
import { ordWalletAddressByChain } from '../../../helpers/fp/ord'
import { TriggerStream } from '../../../helpers/stateHelper'
import { useMidgardHistoryActions } from '../../../hooks/useMidgardHistoryActions'
import { useNetwork } from '../../../hooks/useNetwork'
import { useOpenAddressUrl } from '../../../hooks/useOpenAddressUrl'
import { useOpenExplorerTxUrl } from '../../../hooks/useOpenExplorerTxUrl'
import { ENABLED_CHAINS } from '../../../services/const'

const HISTORY_FILTERS: Filter[] = ['ALL', 'SWITCH', 'DEPOSIT', 'SWAP', 'WITHDRAW', 'DONATE', 'REFUND']

export type Props = {
  className?: string
  reloadHistory: TriggerStream
}
export const WalletHistoryView: React.FC<Props> = ({ className, reloadHistory }) => {
  const { network } = useNetwork()

  const { addressByChain$ } = useChainContext()

  const { requestParams, loadHistory, historyPage, prevHistoryPage, setFilter, setAddress, setPage } =
    useMidgardHistoryActions(10, reloadHistory)

  const { openExplorerTxUrl } = useOpenExplorerTxUrl(O.some(THORChain))

  const keystoreAddresses$ = useMemo<Rx.Observable<WalletAddresses>>(
    () =>
      FP.pipe(
        ENABLED_CHAINS,
        A.map(addressByChain$),
        (addresses) => Rx.combineLatest(addresses),
        RxOp.map(A.filterMap(FP.identity))
      ),
    [addressByChain$]
  )

  const { getLedgerAddress$ } = useWalletContext()

  const ledgerAddresses$ = useMemo(
    () =>
      FP.pipe(
        ENABLED_CHAINS,
        A.map((chain) => getLedgerAddress$(chain, network)),
        (addresses) => Rx.combineLatest(addresses),
        // Accept `successfully` added addresses only
        RxOp.map(A.filterMap(RD.toOption))
      ),
    [getLedgerAddress$, network]
  )

  const addresses$ = useMemo(
    () =>
      FP.pipe(
        Rx.combineLatest([keystoreAddresses$, ledgerAddresses$]),
        RxOp.map(A.flatten),
        RxOp.map(A.sort(ordWalletAddressByChain)),
        RxOp.switchMap((addresses) => {
          FP.pipe(
            addresses,
            // Get first address by default
            A.head,
            O.map(({ address }) => loadHistory({ addresses: [address] }))
          )
          return Rx.of(addresses)
        })
      ),
    [keystoreAddresses$, ledgerAddresses$, loadHistory]
  )

  const addresses = useObservableState(addresses$, [])

  const currentFilter = useMemo(() => requestParams.type || 'ALL', [requestParams])

  const oSelectedWalletAddress: O.Option<WalletAddress> = useMemo(
    () =>
      FP.pipe(
        requestParams.addresses,
        O.fromNullable,
        O.chain(A.head),
        O.chain((paramAddress) =>
          FP.pipe(
            addresses,
            A.findFirst(({ address }) => eqString.equals(address, paramAddress))
          )
        )
      ),
    [addresses, requestParams.addresses]
  )

  const openAddressUrl = useOpenAddressUrl(THORChain)

  const openAddressUrlHandler = useCallback(() => {
    FP.pipe(
      oSelectedWalletAddress,
      O.map(({ address }) => {
        // add extra params for selected filter
        const searchParam = { param: 'txsType', value: historyFilterToViewblockFilter(currentFilter) }
        openAddressUrl(address, [searchParam])
        return true
      })
    )
  }, [currentFilter, oSelectedWalletAddress, openAddressUrl])

  const headerContent = useMemo(
    () => (
      <WalletPoolActionsHistoryHeader
        addresses={addresses}
        selectedAddress={oSelectedWalletAddress}
        network={network}
        availableFilters={HISTORY_FILTERS}
        currentFilter={currentFilter}
        setFilter={setFilter}
        onWalletAddressChanged={setAddress}
        onClickAddressIcon={openAddressUrlHandler}
        disabled={!RD.isSuccess(historyPage)}
      />
    ),
    [
      addresses,
      currentFilter,
      historyPage,
      network,
      oSelectedWalletAddress,
      openAddressUrlHandler,
      setAddress,
      setFilter
    ]
  )

  return (
    <>
      <PoolActionsHistory
        network={network}
        headerContent={headerContent}
        className={className}
        currentPage={requestParams.page + 1}
        historyPageRD={historyPage}
        prevHistoryPage={prevHistoryPage}
        openExplorerTxUrl={openExplorerTxUrl}
        changePaginationHandler={setPage}
      />
    </>
  )
}
