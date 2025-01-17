import { Row } from 'antd'
import Text, { TextProps } from 'antd/lib/typography/Text'
import styled from 'styled-components'
import { palette } from 'styled-theme'

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100%;
  border-left: 1px solid currentColor;
  padding-left: 18px;
  text-transform: uppercase;

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    left: -5px;
    background-color: currentColor;
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }

  &:before {
    top: -5px;
  }

  &:after {
    bottom: -5px;
  }
`

export const DropdownContentWrapper = styled(Row)`
  justify-content: space-between;
  padding-right: 0;
  align-items: center;
  width: 100%;
  cursor: pointer;
`

export const SlipLabel = styled(Text)<TextProps & { active: 'true' | 'false' }>`
  text-transform: uppercase;
  padding: 0;
  font-size: 16px;
  font-family: 'MainFontRegular';
  cursor: pointer;
  color: ${({ active }) => (active ? palette('gray', 2) : palette('gray', 1))};
  &:hover {
    color: ${palette('gray', 2)};
  }
`

export const SlipToleranceWarning = styled(Text)`
  color: ${palette('error', 0)};
`

export const SlipToleranceText = styled(Text)`
  color: ${palette('gray', 2)};
`
