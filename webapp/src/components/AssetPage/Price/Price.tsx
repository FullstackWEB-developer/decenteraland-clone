import React from 'react'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Mana, Stats } from 'dcl-ui'
import { formatWeiMANA } from '../../../lib/mana'
import { Props } from './Price.types'

const Price = ({ asset, price }: Props) => {
  if (!price) {
    return null
  }

  return (
    <Stats title={t('asset_page.price')}>
      <Mana network={asset.network} withTooltip>
        {formatWeiMANA(price)}
      </Mana>
    </Stats>
  )
}

export default React.memo(Price)
