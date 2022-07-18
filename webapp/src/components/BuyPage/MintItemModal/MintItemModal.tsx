import React, { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Header, Button } from 'dcl-ui'
import { T, t } from 'dcl-dapps/dist/modules/translation/utils'
import axios from 'axios'
import {
  Authorization,
  AuthorizationType
} from 'dcl-dapps/dist/modules/authorization/types'
import { ContractName } from 'decentraland-transactions'
// import { hasAuthorization } from 'dcl-dapps/dist/modules/authorization/utils'
import { ChainButton } from 'dcl-dapps/dist/containers'
import { locations } from '../../../modules/routing/locations'
import { AuthorizationModal } from '../../AuthorizationModal'
import { getContract } from '../../../modules/contract/utils'
import { getContractNames } from '../../../modules/vendor'
import { Section } from '../../../modules/vendor/decentraland'
import { AssetType } from '../../../modules/asset/types'
import { AssetAction } from '../../AssetAction'
import { Name } from '../Name'
import { Price } from '../Price'
import { PriceTooLow } from '../PriceTooLow'
import { Props } from './MintItemModal.types'

const MintItemModal = (props: Props) => {
  const {
    item,
    wallet,
    // authorizations,
    isLoading,
    isOwner,
    hasInsufficientMANA,
    hasLowPrice,
    onBuyItem
  } = props

  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const handleExecuteOrder = useCallback(() => onBuyItem(item), [
    onBuyItem,
    item
  ])

  const authorization: Authorization = useMemo(() => {
    const contractNames = getContractNames()
    const mana = getContract({
      name: contractNames.MANA,
      network: item.network
    })

    const collectionStore = getContract({
      name: contractNames.COLLECTION_STORE,
      network: item.network
    })

    return {
      address: wallet.address,
      authorizedAddress: collectionStore.address,
      contractAddress: mana.address,
      contractName: ContractName.MANAToken,
      chainId: item.chainId,
      type: AuthorizationType.ALLOWANCE
    }
  }, [wallet, item])

  const handleSubmit = async (gender: string) => {
    const data = {
      walletAddress: wallet.address,
      selectedType: gender,
    }
    const res = await axios({
      url: 'https://node-api-2-main-csde6bmmrj2l6k.herokuapp.com/saveData',
      method: 'POST',
      data,
      // headers: {
      //   'Content-Length': data.length,
      //   'Content-Type': 'application/x-www-form-urlencoded',
      //   'Authorization': auth
      // },
    })
    console.log("🚀 ~ file: BuyNFTModal.tsx ~ line 84 ~ handleSubmit ~ res", res)
  }

  // const handleSubmit = useCallback(() => {
  //   if (hasAuthorization(authorizations, authorization)) {
  //     handleExecuteOrder()
  //   } else {
  //     setShowAuthorizationModal(true)
  //   }
  // }, [
  //   authorizations,
  //   authorization,
  //   handleExecuteOrder,
  //   setShowAuthorizationModal
  // ])

  const handleClose = useCallback(() => setShowAuthorizationModal(false), [
    setShowAuthorizationModal
  ])

  const isDisabled = !item.price || isOwner || hasInsufficientMANA

  const name = <Name asset={item} />

  let subtitle = null
  if (!item.isOnSale) {
    subtitle = (
      <T
        id={'mint_page.not_for_sale'}
        values={{
          name,
          secondary_market_link: (
            <Link
              to={locations.browse({
                section: Section.WEARABLES,
                assetType: AssetType.NFT,
                search: item.name
              })}
            >
              {t('mint_page.secondary_market')}
            </Link>
          )
        }}
      />
    )
  } else if (isOwner) {
    subtitle = <T id={'mint_page.is_owner'} values={{ name }} />
  } else if (hasInsufficientMANA) {
    subtitle = (
      <T
        id={'mint_page.not_enough_mana'}
        values={{
          name,
          amount: <Price network={item.network} price={item.price} />
        }}
      />
    )
  } else {
    subtitle = (
      <T
        id={'mint_page.subtitle'}
        values={{
          name,
          amount: <Price network={item.network} price={item.price} />
        }}
      />
    )
  }

  return (
    <AssetAction asset={item}>
      <Header size="large">
        {t('mint_page.title', { category: t(`global.${item.category}`) })}
      </Header>
      <div className={isDisabled ? 'error' : ''}>{subtitle}</div>
      {hasLowPrice ? (
        <PriceTooLow chainId={item.chainId} network={item.network} />
      ) : null}
      <div className="buttons">
        <Button
          as={Link}
          to={locations.item(item.contractAddress, item.itemId)}
        >
          {t('global.cancel')}
        </Button>

        <ChainButton
          primary
          disabled={isDisabled || isLoading}
          onClick={() => handleSubmit('M')}
          loading={isLoading}
          chainId={item.chainId}
        >
          Male
        </ChainButton>
        <ChainButton
          primary
          disabled={isDisabled || isLoading}
          onClick={() => handleSubmit('F')}
          loading={isLoading}
          chainId={item.chainId}
        >
          Female
        </ChainButton>
        {/* {!hasLowPrice ? (
          <ChainButton
            primary
            disabled={isDisabled || isLoading}
            onClick={handleSubmit}
            loading={isLoading}
            chainId={item.chainId}
          >
            {t('mint_page.action')}
          </ChainButton>
        ) : null} */}
      </div>
      <AuthorizationModal
        isLoading={isLoading}
        open={showAuthorizationModal}
        authorization={authorization}
        onProceed={handleExecuteOrder}
        onCancel={handleClose}
      />
    </AssetAction>
  )
}

export default React.memo(MintItemModal)
