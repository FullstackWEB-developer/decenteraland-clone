import React from 'react'
import { Badge } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Network } from '../Network'
import { Props } from './ENSDetail.types'
import { Owner } from '../Owner'
import Price from '../Price'
import Expiration from '../Expiration'
import { Actions } from '../Actions'
import { BidList } from '../BidList'
import { TransactionHistory } from '../TransactionHistory'
import BaseDetail from '../BaseDetail'
import { AssetImage } from '../../AssetImage'

const ENSDetail = ({ nft }: Props) => (
  <BaseDetail
    asset={nft}
    assetImage={<AssetImage asset={nft} showMonospace />}
    isOnSale={!!nft.activeOrderId}
    badges={<Badge color="#37333d">{t('global.ens')}</Badge>}
    left={<Owner asset={nft} />}
    box={
      <>
        <Price asset={nft} />
        <Network asset={nft} />
        <Actions nft={nft} />
        <Expiration />
      </>
    }
    below={
      <>
        <BidList nft={nft} />
        <TransactionHistory asset={nft} />
      </>
    }
  />
)

export default React.memo(ENSDetail)
