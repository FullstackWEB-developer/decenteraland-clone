import React from 'react'
import {
  Back,
  Column,
  Narrow,
  Page,
  Row,
  Section,
  Header,
  Badge,
  Icon,
  Color,
  Button,
  Loader,
  Table,
  Dropdown,
  Mobile,
  NotMobile
} from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { Props } from './CollectionPage.types'
import { Mana } from '../Mana'
import { formatWeiMANA } from '../../lib/mana'
import { Rarity } from '@dcl/schemas'
import CollectionProvider from '../CollectionProvider'
import { getBuilderCollectionDetailUrl } from '../../modules/collection/utils'
import AssetCell from '../OnSaleList/AssetCell'
import styles from './CollectionPage.module.css'

const CollectionPage = (props: Props) => {
  const { contractAddress, currentAddress, onBack } = props

  return (
    <div>
      <Navbar isFullscreen />
      <Navigation />
      <Page className={styles.page}>
        {contractAddress ? (
          <CollectionProvider contractAddress={contractAddress} withItems>
            {({ collection, items, isLoading }) => {
              const isCollectionOwner =
                !!collection &&
                !!currentAddress &&
                collection.creator.toLowerCase() === currentAddress

              const builderCollectionUrl = getBuilderCollectionDetailUrl(
                contractAddress
              )

              return isLoading ? (
                <Loader size="massive" active />
              ) : !collection || !items ? (
                <div>{t('collection_page.no_collection')}</div>
              ) : (
                <>
                  <Section>
                    <Column>
                      <Back absolute onClick={onBack} />
                      <Narrow>
                        <Row stacked>
                          <Column>
                            <Row>
                              <Header size="large">{collection.name}</Header>
                              {collection.isOnSale && (
                                <Badge color={Color.SUMMER_RED}>
                                  <Icon name="tag" />
                                  <span className={styles.badge}>
                                    {t('collection_page.on_sale')}
                                  </span>
                                </Badge>
                              )}
                            </Row>
                          </Column>
                          {isCollectionOwner && (
                            <Column
                              align="right"
                              className={styles.columnRight}
                            >
                              <Row align="right">
                                <Button
                                  primary
                                  inverted
                                  compact
                                  as="a"
                                  href={builderCollectionUrl}
                                >
                                  {t('collection_page.edit_in_builder')}
                                </Button>
                                <Button
                                  primary
                                  inverted
                                  compact
                                  as="a"
                                  href={builderCollectionUrl}
                                >
                                  {collection.isOnSale
                                    ? t('collection_page.unlist_from_market')
                                    : t('collection_page.list_on_market')}
                                </Button>
                              </Row>
                            </Column>
                          )}
                        </Row>
                      </Narrow>
                    </Column>
                  </Section>
                  <Section>
                    <Narrow>
                      <Table basic="very">
                        <Table.Header>
                          <NotMobile>
                            <Table.Row>
                              <Table.HeaderCell>
                                {t('global.item')}
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                {t('global.category')}
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                {t('global.rarity')}
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                {t('global.stock')}
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                {t('global.price')}
                              </Table.HeaderCell>
                              {isCollectionOwner && <Table.HeaderCell />}
                            </Table.Row>
                          </NotMobile>
                        </Table.Header>
                        <Table.Body>
                          <Mobile>
                            {items.map(item => (
                              <div key={item.id} className="mobile-row">
                                <AssetCell asset={item} />
                                <Mana network={item.network} inline>
                                  {formatWeiMANA(item.price)}
                                </Mana>
                              </div>
                            ))}
                          </Mobile>
                          <NotMobile>
                            {items.map(item => (
                              <Table.Row key={item.id} className={styles.row}>
                                <Table.Cell>
                                  <AssetCell asset={item} />
                                </Table.Cell>
                                <Table.Cell>
                                  {t(`global.${item.category}`)}
                                </Table.Cell>
                                <Table.Cell>
                                  {t(`rarity.${item.rarity}`)}
                                </Table.Cell>
                                <Table.Cell>
                                  {item.available.toLocaleString()}/
                                  {Rarity.getMaxSupply(
                                    item.rarity
                                  ).toLocaleString()}
                                </Table.Cell>
                                <Table.Cell>
                                  <Mana network={item.network} inline>
                                    {formatWeiMANA(item.price)}
                                  </Mana>
                                </Table.Cell>
                                {isCollectionOwner && (
                                  <Table.Cell>
                                    <Dropdown
                                      className={styles.ellipsis}
                                      icon="ellipsis horizontal"
                                      direction="left"
                                    >
                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          text={t('collection_page.edit_price')}
                                          as="a"
                                          href={builderCollectionUrl}
                                        />
                                        <Dropdown.Item
                                          text={t('collection_page.mint_item')}
                                          as="a"
                                          href={builderCollectionUrl}
                                        />
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </Table.Cell>
                                )}
                              </Table.Row>
                            ))}
                          </NotMobile>
                        </Table.Body>
                      </Table>
                    </Narrow>
                  </Section>
                </>
              )
            }}
          </CollectionProvider>
        ) : (
          <div>{t('collection_page.no_collection')}</div>
        )}
      </Page>
      <Footer />
    </div>
  )
}

export default React.memo(CollectionPage)
