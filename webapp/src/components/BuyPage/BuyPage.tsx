import React from 'react'
import { ethers } from 'ethers'
import { Item, Order } from '@dcl/schemas'
import { Page } from 'dcl-ui'
import { Wallet } from 'dcl-dapps/dist/modules/wallet/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet as WalletProvider } from '../Wallet'
import { AssetProviderPage } from '../AssetProviderPage'
import { NFT } from '../../modules/nft/types'
import { isOwnedBy } from '../../modules/asset/utils'
import { Asset, AssetType } from '../../modules/asset/types'
import { BuyNFTModal } from './BuyNFTModal'
import { MintItemModal } from './MintItemModal'
import { isPriceTooLow } from './utils'
import { Props } from './BuyPage.types'
import './BuyPage.css'

const BuyPage = (props: Props) => {
  const { type } = props

  const isInsufficientMANA = (
    wallet: Wallet,
    asset: Asset,
    order: Order | null
  ) =>
    !!order &&
    wallet.networks[asset.network].mana < +ethers.utils.formatEther(order.price)

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <WalletProvider>
          {wallet => (
            <AssetProviderPage type={type}>
              {(asset, order) => {
                const price =
                  type === AssetType.ITEM
                    ? (asset as Item).price
                    : order
                    ? order.price
                    : ''

                const modalProps = {
                  wallet: wallet,
                  isOwner: isOwnedBy(asset, wallet),
                  hasInsufficientMANA: isInsufficientMANA(wallet, asset, order),
                  hasLowPrice:
                    wallet.chainId !== asset.chainId && isPriceTooLow(price)
                }

                return type === AssetType.NFT ? (
                  <BuyNFTModal
                    nft={asset as NFT}
                    order={order}
                    {...modalProps}
                  />
                ) : type === AssetType.ITEM ? (
                  <MintItemModal item={asset as Item} {...modalProps} />
                ) : null
              }}
            </AssetProviderPage>
          )}
        </WalletProvider>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
