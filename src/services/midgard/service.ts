import * as RD from '@devexperts/remote-data-ts'
import byzantine from '@thorchain/byzantine-module'
import * as O from 'fp-ts/lib/Option'
import { some } from 'fp-ts/lib/Option'
import * as Rx from 'rxjs'
import { retry, catchError, concatMap, tap, exhaustMap, mergeMap, shareReplay } from 'rxjs/operators'

import { PRICE_POOLS_WHITELIST } from '../../const'
import { observableState, triggerStream } from '../../helpers/stateHelper'
import { Configuration, DefaultApi } from '../../types/generated/midgard'
import { PricePoolAsset } from '../../views/pools/types'
import { PoolsStateRD, PoolsState, PoolDetails, NetworkInfoRD } from './types'
import { getPricePools, selectedPricePoolSelector } from './utils'

export const MIDGARD_MAX_RETRY = 3
export const BYZANTINE_MAX_RETRY = 5

/**
 * Helper to get `DefaultApi` instance for Midgard using custom basePath
 */
const getMidgardDefaultApi = (basePath: string) => new DefaultApi(new Configuration({ basePath }))

/**
 * Endpoint provided by Byzantine
 */
const byzantine$ = Rx.from(byzantine()).pipe(retry(BYZANTINE_MAX_RETRY))

/**
 * State of pools data
 */
export const { get$: getPoolsState$, set: setPoolState } = observableState<PoolsStateRD>(RD.initial)

/**
 * Loading queue to get all needed data for `PoolsState`
 */
const loadPoolsStateData$ = () => {
  let state: PoolsState
  // Update `PoolState` to `pending`
  setPoolState(RD.pending)
  // start queue of requests to get all pool data
  return apiGetPools$.pipe(
    // set `PoolAssets` into state
    tap((poolAssets) => (state = { ...state, poolAssets })),
    // load `AssetDetails`
    concatMap((poolAssets) => apiGetAssetInfo$(poolAssets)),
    // store `AssetDetails`
    tap((assetDetails) => (state = { ...state, assetDetails })),
    // Derive + store `assetDetailIndex`
    tap((assetDetails) => (state = { ...state, assetDetails })),
    // load `PoolDetails`
    concatMap((_) => apiGetPoolsData$(state.poolAssets)),
    // Derive + store `poolDetails`
    tap((poolDetails: PoolDetails) => {
      state = { ...state, poolDetails }
    }),
    // Derive + store `pricePools`
    tap((poolDetails: PoolDetails) => {
      state = { ...state, pricePools: some(getPricePools(poolDetails, PRICE_POOLS_WHITELIST)) }
    }),
    // Update selected `PricePoolAsset`
    tap((_) => {
      // check storage
      const prevAsset = selectedPricePoolAsset()
      const pricePools = O.toNullable(state.pricePools)
      if (pricePools) {
        const selectedPricePool = selectedPricePoolSelector(pricePools, prevAsset)
        setSelectedPricePoolAsset(selectedPricePool.asset)
      }
    }),
    // set everything into a `success` state
    tap((_) => setPoolState(RD.success(state))),
    // catch any errors if there any
    catchError((error: Error) => {
      // set `error` state
      setPoolState(RD.failure(error))
      return Rx.of('error while fetchting data for pool')
    }),
    retry(MIDGARD_MAX_RETRY)
  )
}

/**
 * Get data of `Pools` from Midgard
 */
const apiGetPools$ = byzantine$.pipe(
  concatMap((endpoint) => {
    const api = getMidgardDefaultApi(endpoint)
    return api.getPools()
  })
)

/**
 * Get data of `AssetDetails` from Midgard
 */
const apiGetAssetInfo$ = (poolAssets: string[]) =>
  byzantine$.pipe(
    concatMap((endpoint) => {
      const api = getMidgardDefaultApi(endpoint)
      return api.getAssetInfo({ asset: poolAssets.join() })
    })
  )

/**
 * Get `PoolDetails` data from Midgard
 */
const apiGetPoolsData$ = (poolAssets: string[]) =>
  byzantine$.pipe(
    concatMap((endpoint) => {
      const api = getMidgardDefaultApi(endpoint)
      return api.getPoolsData({ asset: poolAssets.join() })
    })
  )

// `TriggerStream` to reload data of pools
const { stream$: reloadPoolsState$, trigger: reloadPoolsState } = triggerStream()

/**
 * State of all pool data
 */
const poolsState$: Rx.Observable<PoolsStateRD> = reloadPoolsState$.pipe(
  // start loading queue
  exhaustMap((_) => loadPoolsStateData$()),
  // return state of pool data
  mergeMap((_) => getPoolsState$),
  // cache it to avoid reloading data by every subscription
  shareReplay()
)

const PRICE_POOL_KEY = 'asgdx-price-pool'

export const getSelectedPricePool = () => O.fromNullable(localStorage.getItem(PRICE_POOL_KEY) as PricePoolAsset)

export const {
  get$: selectedPricePoolAsset$,
  get: selectedPricePoolAsset,
  set: updateSelectedPricePoolAsset
} = observableState<O.Option<PricePoolAsset>>(getSelectedPricePool())

/**
 * Update selected `PricePoolAsset`
 */
export const setSelectedPricePoolAsset = (asset: PricePoolAsset) => {
  localStorage.setItem(PRICE_POOL_KEY, asset)
  updateSelectedPricePoolAsset(some(asset))
}

/**
 * API request to get data of `NetworkInfo`
 */
const apiGetNetworkData$ = byzantine$.pipe(
  concatMap((endpoint) => {
    const api = getMidgardDefaultApi(endpoint)
    return api.getNetworkData()
  })
)

/**
 * State of NetworkInfoRD
 */
export const { get$: getNetworkInfo$, set: setNetworkInfo } = observableState<NetworkInfoRD>(RD.initial)

/**
 * Loads data of `NetworkInfo`
 */
const loadNetworkData$ = () => {
  // Update `PoolState` to `pending`
  setNetworkInfo(RD.pending)
  return apiGetNetworkData$.pipe(
    // store result
    tap((info) => setNetworkInfo(RD.success(info))),
    // catch any errors if there any
    catchError((error: Error) => {
      // set `error` state
      setNetworkInfo(RD.failure(error))
      return Rx.of('error while fetchting data for pool')
    }),
    retry(MIDGARD_MAX_RETRY)
  )
}

// `TriggerStream` to reload `NetworkInfo`
const { stream$: reloadNetworkInfo$, trigger: reloadNetworkInfo } = triggerStream()

/**
 * State of `NetworkInfo`, it will load data by first subscription only
 */
const networkInfo$: Rx.Observable<NetworkInfoRD> = reloadNetworkInfo$.pipe(
  // start request
  exhaustMap((_) => loadNetworkData$()),
  // return state of pool data
  mergeMap((_) => getNetworkInfo$),
  // cache it to avoid reloading data by every subscription
  shareReplay()
)

/**
 * Service object with all "public" functions and observables we want provide
 */
const service = {
  poolsState$,
  reloadPoolsState,
  networkInfo$,
  reloadNetworkInfo,
  setSelectedPricePool: setSelectedPricePoolAsset,
  selectedPricePoolAsset$
}

// Default
export default service