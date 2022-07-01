import React from 'react'
import { Header } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import Stats from './Stats'
import Activity from './Activity'
import './Sales.css'

const Sales = () => {
  return (
    <div className="Sales">
      <div className="header-with-filter">
        <Header>{t('sales.stats')}</Header>
      </div>
      <Stats />
      <Activity />
    </div>
  )
}

export default React.memo(Sales)
