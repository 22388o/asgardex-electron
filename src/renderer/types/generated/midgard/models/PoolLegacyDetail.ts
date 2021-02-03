// tslint:disable
/**
 * Midgard Public API
 * The Midgard Public API queries THORChain and any chains linked via the Bifröst and prepares information about the network to be readily available for public users. The API parses transaction event data from THORChain and stores them in a time-series database to make time-dependent queries easy. Midgard does not hold critical information. To interact with BEPSwap and Asgardex, users should query THORChain directly.
 *
 * The version of the OpenAPI document: 2.0.0-alpha.2
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface PoolLegacyDetail
 */
export interface PoolLegacyDetail {
    /**
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    asset: string;
    /**
     * same as assetDepth from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    assetDepth: string;
    /**
     * same as addAssetLiquidityVolume from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    assetStakedTotal: string;
    /**
     * same as toAssetCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    buyAssetCount: string;
    /**
     * same as toAssetFees / toAssetCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    buyFeeAverage: string;
    /**
     * same as toAssetFees from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    buyFeesTotal: string;
    /**
     * same as toAssetAverageSlip from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    buySlipAverage: string;
    /**
     * same as toAssetVolume / toAssetCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    buyTxAverage: string;
    /**
     * same as toAssetVolume from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    buyVolume: string;
    /**
     * Float, Average Percentage Yield: annual return estimated using last weeks income, taking compound interest into account.
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolAPY: string;
    /**
     * same as 2*runeDepth from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolDepth: string;
    /**
     * same as totalFees / swapCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolFeeAverage: string;
    /**
     * same as totalFees from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolFeesTotal: string;
    /**
     * same as averageSlip from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolSlipAverage: string;
    /**
     * same as addLiquidityVolume from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolStakedTotal: string;
    /**
     * same as swapVolume / swapCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolTxAverage: string;
    /**
     * same as units from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolUnits: string;
    /**
     * Int64, same as buyVolume + sellVolume
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    poolVolume: string;
    /**
     * same as assetPrice from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    price: string;
    /**
     * same as runeDepth from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    runeDepth: string;
    /**
     * same as addRuneLiquidityVolume from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    runeStakedTotal: string;
    /**
     * same as toRuneCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    sellAssetCount: string;
    /**
     * same as toRuneFees / toRuneCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    sellFeeAverage: string;
    /**
     * same as toRuneFees from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    sellFeesTotal: string;
    /**
     * same as toRuneAverageSlip from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    sellSlipAverage: string;
    /**
     * same as toRuneVolume / toRuneCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    sellTxAverage: string;
    /**
     * same as toRuneVolume from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    sellVolume: string;
    /**
     * same as addLiquidityCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    stakeTxCount: string;
    /**
     * same as uniqueMemberCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    stakersCount: string;
    /**
     * same as addLiquidityCount + withdrawCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    stakingTxCount: string;
    /**
     * same as status from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    status: string;
    /**
     * Int64, same as history/swaps:uniqueSwapperCount
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    swappersCount: string;
    /**
     * Int64, same as history/swaps:totalCount
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    swappingTxCount: string;
    /**
     * Int64, same as swapVolume pool/stats?period=24h
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    volume24h: string;
    /**
     * same as withdrawCount from pool/stats
     * @type {string}
     * @memberof PoolLegacyDetail
     */
    withdrawTxCount: string;
}