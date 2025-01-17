import React from 'react'

import { Story } from '@storybook/react'
import { AssetRuneNative, assetToBase, assetAmount } from '@xchainjs/xchain-util'
import * as FP from 'fp-ts/function'
import * as O from 'fp-ts/Option'

import { mockWalletBalance } from '../../../../helpers/test/testWalletHelper'
import { AssetInfo } from './AssetInfo'

export const AssetInfoStory: Story<{
  address: string
  balance: number
}> = ({ address, balance }) => {
  return (
    <AssetInfo
      walletInfo={FP.pipe(
        address,
        O.fromPredicate((s) => !!s),
        O.map((address) => ({ address, network: 'testnet', walletType: 'keystore' }))
      )}
      asset={O.some(AssetRuneNative)}
      assetsWB={O.some([
        mockWalletBalance({
          amount: assetToBase(assetAmount(balance))
        })
      ])}
      network="testnet"
    />
  )
}

AssetInfoStory.args = {
  address: 'tthor18ngerf2l9c6ht7wr83ccyt02s6pws4lff8w0ug',
  balance: 123
}

export default {
  title: 'Wallet/AssetInfo',
  component: AssetInfo
}
