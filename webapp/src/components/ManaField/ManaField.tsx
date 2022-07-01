import React from 'react'
import { Field, Mana } from 'dcl-ui'
import { Props } from './ManaField.types'
import './ManaField.css'

export default class ManaField extends React.PureComponent<Props> {
  render() {
    const { className, network, ...rest } = this.props
    let classes = `ManaField ${network}`
    if (className) {
      classes += ' ' + className
    }
    return (
      <Field
        {...rest}
        className={classes}
        icon={<Mana network={network} />}
        iconPosition="left"
      />
    )
  }
}
