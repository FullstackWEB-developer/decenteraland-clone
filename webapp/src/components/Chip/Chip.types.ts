import React from 'react'
import { IconProps } from 'dcl-ui'

export type Props = {
  className: string
  text: React.ReactNode
  icon: IconProps['name'] | ''
  type: 'square' | 'rectangle' | 'circle'
  isActive: boolean
  isDisabled: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => any
}
