import React, { useCallback } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Asset, assetToString } from '@xchainjs/xchain-util'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router'

import * as poolsRoutes from '../../routes/pools'
import { Button, ButtonProps, ButtonSize } from '../uielements/button'

type Props = ButtonProps & {
  className?: string
  asset: Asset
  sizevalue?: ButtonSize
  isTextView: boolean
  disabled?: boolean
}
export const ManageButton: React.FC<Props> = ({
  disabled,
  className,
  asset,
  sizevalue = 'normal',
  isTextView,
  ...otherProps
}) => {
  const intl = useIntl()
  const history = useHistory()

  const onClick = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      history.push(poolsRoutes.deposit.path({ asset: assetToString(asset) }))
    },
    [asset, history]
  )

  return (
    <Button
      disabled={disabled}
      round="true"
      typevalue="outline"
      sizevalue={sizevalue}
      className={className}
      onClick={onClick}
      style={{ height: 30 }}
      {...otherProps}>
      <PlusOutlined />
      {isTextView && intl.formatMessage({ id: 'common.manage' })}
    </Button>
  )
}
