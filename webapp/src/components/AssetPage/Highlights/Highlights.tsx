import React from 'react'
import classnames from 'classnames'
import { Header } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'

import { Row } from '../../Layout/Row'
import { Props } from './Highlights.types'
import './Highlights.css'

const Highlights = (props: Props) => {
  const { className, children } = props
  return (
    <div className={classnames(['Highlights', className])}>
      <Header sub>{t('highlights.title')}</Header>
      <Row>{children}</Row>
    </div>
  )
}

export default React.memo(Highlights)
