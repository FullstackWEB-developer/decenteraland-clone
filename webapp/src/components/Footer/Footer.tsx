import React from 'react'
import { FooterProps } from 'dcl-ui'
import { Footer as BaseFooter } from 'dcl-dapps/dist/containers'
import * as tranlsations from '../../modules/translation/locales'

const locales = Object.keys(tranlsations)

const Footer = (props: FooterProps) => (
  <BaseFooter locales={locales} {...props} />
)

export default React.memo(Footer)
