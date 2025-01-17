import React, { createContext, useContext } from 'react'

import * as O from 'fp-ts/lib/Option'
import { none, Option, some } from 'fp-ts/lib/Option'

import {
  client$,
  reloadBalances,
  balancesState$,
  chainBalances$,
  reloadBalancesByChain,
  keystoreService,
  selectedAsset$,
  loadTxs,
  getTxs$,
  setSelectedAsset,
  resetTxsPage,
  askLedgerAddress$,
  getLedgerAddress$,
  removeLedgerAddress,
  verifyLedgerAddress,
  ledgerAddresses$
} from '../services/wallet'

type WalletContextValue = {
  client$: typeof client$
  keystoreService: typeof keystoreService
  reloadBalances: typeof reloadBalances
  balancesState$: typeof balancesState$
  chainBalances$: typeof chainBalances$
  loadTxs: typeof loadTxs
  reloadBalancesByChain: typeof reloadBalancesByChain
  selectedAsset$: typeof selectedAsset$
  getTxs$: typeof getTxs$
  setSelectedAsset: typeof setSelectedAsset
  resetTxsPage: typeof resetTxsPage
  ledgerAddresses$: typeof ledgerAddresses$
  askLedgerAddress$: typeof askLedgerAddress$
  getLedgerAddress$: typeof getLedgerAddress$
  verifyLedgerAddress: typeof verifyLedgerAddress
  removeLedgerAddress: typeof removeLedgerAddress
}

const initialContext: WalletContextValue = {
  client$,
  keystoreService,
  reloadBalances,
  reloadBalancesByChain,
  loadTxs,
  balancesState$,
  chainBalances$,
  selectedAsset$,
  getTxs$,
  setSelectedAsset,
  resetTxsPage,
  ledgerAddresses$,
  askLedgerAddress$,
  getLedgerAddress$,
  verifyLedgerAddress,
  removeLedgerAddress
}
const WalletContext = createContext<Option<WalletContextValue>>(none)

export const WalletProvider: React.FC = ({ children }): JSX.Element => (
  <WalletContext.Provider value={some(initialContext)}>{children}</WalletContext.Provider>
)

export const useWalletContext = () => {
  const context = O.toNullable(useContext(WalletContext))
  if (!context) {
    throw new Error('Context must be used within a WalletProvider.')
  }
  return context
}
