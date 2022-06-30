import * as React from 'react'

import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { ModalNavigation } from 'decentraland-ui/dist/components/ModalNavigation/ModalNavigation'
// import {
//   Navbar as NavbarComponent,
//   NavbarI18N
// } from 'decentraland-ui/dist/components/Navbar/Navbar'
import { getChainName } from '@dcl/schemas/dist/dapps/chain-id'
import { T } from 'decentraland-dapps/dist/modules/translation/utils'
// import { T } from '../../modules/translation/utils'
import { ChainProvider, Modal } from 'decentraland-dapps/dist/containers'
import { NavbarProps } from './Navbar.types'
// import { NavbarProps } from 'decentraland-dapps/dist/containers/Navbar/Navbar.types'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import { Mana } from 'decentraland-ui/dist/components/Mana/Mana'
import { Blockie } from 'decentraland-ui/dist/components/Blockie/Blockie'
import { Container } from 'decentraland-ui/dist/components/Container/Container'
import { Header } from 'decentraland-ui/dist/components/Header/Header'
// import { Logo } from 'decentraland-ui/dist/components/Logo/Logo'
import { Mobile, NotMobile } from 'decentraland-ui/dist/components/Media'
import 'decentraland-ui/dist/components/Navbar/Navbar.css'
import 'decentraland-ui/dist/components/Logo/Logo.css'

export type NavbaComponentProps = {
  mana?: number | null
  address?: string | null
  activePage?:
  | 'marketplace'
  | 'docs'
  | 'events'
  | 'agora'
  | 'dao'
  | 'blog'
  | 'builder'
  | string | null
  leftMenu?: React.ReactNode
  middleMenu?: React.ReactNode
  rightMenu?: React.ReactNode
  i18n?: any
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
  isFullscreen?: boolean
  isOverlay?: boolean
  className?: string
  onSignIn?: () => void
  onClickAccount?: () => void
  isFullWidth?: boolean
}

export type NavbarState = {
  toggle: boolean
}

export class NavbarComponent extends React.PureComponent<NavbaComponentProps, NavbarState> {
  static defaultProps: Partial<NavbaComponentProps> = {
    mana: null,
    address: null,
    activePage: null,
    leftMenu: null,
    middleMenu: null,
    i18n: {
      menu: {
        marketplace: 'Marketplace',
        docs: 'Docs',
        // events: 'Events',
        // agora: 'Agora',
        // dao: 'DAO',
        // blog: 'Blog',
        builder: 'Builder'
      },
      account: {
        signIn: 'Sign In',
        connecting: 'Connecting...'
      }
    },
    isConnected: false,
    isConnecting: false,
    isFullscreen: false,
    isOverlay: false,
    isSignIn: false,
    onSignIn: undefined,
    onClickAccount: undefined,
    isFullWidth: false
  }
  public state = {
    toggle: false
  }
  componentDidMount(): void {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.handleDocumentClick)
  }
  handleToggle = (event: React.MouseEvent): void => {
    this.setState({ toggle: !this.state.toggle })
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }
  handleDocumentClick = (): void => {
    this.setState({ toggle: false })
  }

  renderLeftMenu(): React.ReactNode {
    const { activePage, i18n, leftMenu } = this.props
    if (leftMenu) {
      return leftMenu
    }
    return (
      <>
        <Menu.Item
          active={activePage === 'marketplace'}
          href="https://decenteraland-clone.vercel.app"
        >
          {i18n.menu.marketplace}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'builder'}
          href="https://builder-clone.vercel.app"
        >
          {i18n.menu.builder}
        </Menu.Item>
        {/* <Menu.Item
          active={activePage === 'docs'}
          href="https://docs.decentraland.org"
        >
          {i18n.menu.docs}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'events'}
          href="https://events.decentraland.org"
        >
          {i18n.menu.events}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'dao'}
          href="https://dao.decentraland.org"
        >
          {i18n.menu.dao}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'blog'}
          href="https://decentraland.org/blog"
        >
          {i18n.menu.blog}
        </Menu.Item> */}
      </>
    )
  }

  renderRightMenu(): React.ReactNode {
    const {
      rightMenu,
      middleMenu,
      isConnected,
      onClickAccount,
      mana,
      address,
      isConnecting,
      isSignIn,
      i18n,
      onSignIn
    } = this.props
    if (rightMenu) {
      return rightMenu
    } else if (isConnected) {
      return (
        <>
          {middleMenu ? (
            <NotMobile>
              <Menu secondary className="dcl navbar-account-menu">
                {middleMenu}
              </Menu>
            </NotMobile>
          ) : null}
          <span
            className={`dcl account-wrapper ${onClickAccount ? 'clickable' : ''
              }`}
            onClick={onClickAccount}
          >
            {mana != null ? (
              <Mana size="small" title={`${mana.toLocaleString()} MANA`}>
                {Number(mana.toFixed(2)).toLocaleString()}
              </Mana>
            ) : null}
            {address != null ? <Blockie seed={address} /> : null}
          </span>
        </>
      )
    } else if (isConnecting && !isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item disabled>{i18n.account.connecting}</Menu.Item>
        </Menu>
      )
    } else if (onSignIn || isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item className="sign-in-button" onClick={onSignIn}>
            {i18n.account.signIn}
          </Menu.Item>
        </Menu>
      )
    } else {
      return null
    }
  }

  render(): JSX.Element {
    const {
      activePage,
      className,
      isSignIn,
      isFullscreen,
      isOverlay,
      isFullWidth
    } = this.props

    let classes = `dcl navbar`

    if (this.state.toggle) {
      classes += ' open'
    }

    if (isSignIn) {
      classes += ' sign-in'
    }

    if (isFullscreen) {
      classes += ' fullscreen'
    }

    if (isOverlay) {
      classes += ' overlay'
    }

    if (className) {
      classes += ` ${className}`
    }

    return (
      <div className={classes} role="navigation">
        <Container className={isFullWidth ? 'full-width' : ''}>
          <div className="dcl navbar-menu">
            <NotMobile>
              <Menu secondary stackable>
                <a className="dcl navbar-logo" href="https://birdezkingdom.com">
                  <img src={'../../images/logo.png'} alt="Decentraland" />
                  {/* <Logo /> */}
                </a>
                {this.renderLeftMenu()}
              </Menu>
            </NotMobile>
            <Mobile>
              <div className="dcl navbar-mobile-menu">
                <a className="dcl navbar-logo" href="https://birdezkingdom.com">
                  <i style={{ backgroundImage: "url('../../images/logo.png')" }} className="dcl icon-logo" />
                  {/* <Logo /> */}
                </a>
                <Header
                  size="small"
                  className={`dcl active-page ${this.state.toggle ? 'caret-up' : 'caret-down'
                    }`}
                  onClick={this.handleToggle}
                >
                  {activePage}
                </Header>
              </div>
            </Mobile>
          </div>

          <div className="dcl navbar-account">{this.renderRightMenu()}</div>
        </Container>
        <div className="mobile-menu">{this.renderLeftMenu()}</div>
      </div>
    )
  }
}

export default class Navbar extends React.PureComponent<NavbarProps> {
  // getTranslations = (): NavbarI18N | undefined => {
  getTranslations = (): any | undefined => {
    if (!this.props.hasTranslations) {
      return undefined
    }
    return {
      menu: {
        marketplace: <T id="@dapps.navbar.menu.marketplace" />,
        // events: <T id="@dapps.navbar.menu.events" />,
        // agora: <T id="@dapps.navbar.menu.agora" />,
        // dao: <T id="@dapps.navbar.menu.dao" />,
        // docs: <T id="@dapps.navbar.menu.docs" />,
        // blog: <T id="@dapps.navbar.menu.blog" />,
        builder: <T id="@dapps.navbar.menu.builder" />
      },
      account: {
        connecting: <T id="@dapps.navbar.account.connecting" />,
        signIn: <T id="@dapps.navbar.account.signIn" />
      }
    }
  }

  handleSwitchNetwork = () => {
    this.props.onSwitchNetwork(this.props.appChainId)
  }

  handleSignOut = () => {
    this.props.onSignOut()
  }

  render() {
    const {
      appChainId,
      hasAcceptedNetworkPartialSupport,
      onAcceptNetworkPartialSupport
    } = this.props
    const expectedChainName = getChainName(appChainId)
    return (
      <>
        <NavbarComponent {...this.props} i18n={this.getTranslations()} />
        <ChainProvider>
          {({ chainId, isUnsupported, isPartiallySupported }) =>
            isUnsupported ? (
              <Modal open size="tiny">
                <ModalNavigation
                  title={<T id="@dapps.navbar.wrong_network.header" />}
                />
                <Modal.Content>
                  {!getChainName(chainId!) ? (
                    <T
                      id="@dapps.navbar.wrong_network.message_unknown_network"
                      values={{
                        expectedChainName: <b>{expectedChainName}</b>
                      }}
                    />
                  ) : (
                    <T
                      id="@dapps.navbar.wrong_network.message"
                      values={{
                        currentChainName: <b>{getChainName(chainId!)}</b>,
                        expectedChainName: <b>{expectedChainName}</b>
                      }}
                    />
                  )}
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={this.handleSwitchNetwork}>
                    <T
                      id="@dapps.navbar.wrong_network.switch_button"
                      values={{
                        chainName: <b>{expectedChainName}</b>
                      }}
                    />
                  </Button>
                </Modal.Actions>
              </Modal>
            ) : isPartiallySupported ? (
              <Modal open={!hasAcceptedNetworkPartialSupport} size="small">
                <ModalNavigation
                  title={
                    <T id="@dapps.navbar.partially_supported_network.header" />
                  }
                />
                <Modal.Content>
                  <T
                    id="@dapps.navbar.partially_supported_network.message"
                    values={{
                      currentChainName: <b>{getChainName(chainId!)}</b>,
                      expectedChainName: <b>{expectedChainName}</b>
                    }}
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={this.handleSwitchNetwork}>
                    <T
                      id="@dapps.navbar.wrong_network.switch_button"
                      values={{
                        chainName: <b>{expectedChainName}</b>
                      }}
                    />
                  </Button>
                  <Button secondary onClick={onAcceptNetworkPartialSupport}>
                    <T
                      id="@dapps.navbar.partially_supported_network.continue_button"
                      values={{
                        chainName: <b>{getChainName(chainId!)}</b>
                      }}
                    />
                  </Button>
                </Modal.Actions>
              </Modal>
            ) : null
          }
        </ChainProvider>
      </>
    )
  }
}
