import { connect } from 'react-redux'
import {
  isConnected,
  isConnecting,
  getAddress,
  getMana,
  getChainId,
  hasAcceptedNetworkPartialSupport,
  getAppChainId
} from 'decentraland-dapps/dist/modules/wallet/selectors'
import { isEnabled } from 'decentraland-dapps/dist/modules/translation/selectors'
import {
  acceptNetworkPartialSupport,
  disconnectWallet,
  switchNetworkRequest
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { RootDispatch } from 'decentraland-dapps/dist/types'
import { NavbarProps, MapStateProps, MapDispatchProps } from './Navbar.types'
import Navbar from './Navbar'

const mapState = (state: any): MapStateProps => ({
  chainId: getChainId(state),
  mana: getMana(state),
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  hasTranslations: isEnabled(state),
  appChainId: getAppChainId(state),
  hasAcceptedNetworkPartialSupport: hasAcceptedNetworkPartialSupport(state)
})

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onSwitchNetwork: chainId => dispatch(switchNetworkRequest(chainId)),
  onSignOut: () => dispatch(disconnectWallet()),
  onAcceptNetworkPartialSupport: () => dispatch(acceptNetworkPartialSupport())
})

const mergeProps = (
  stateProps: MapStateProps,
  dispatchProps: MapDispatchProps,
  ownProps: NavbarProps
): NavbarProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(mapState, mapDispatch, mergeProps)(Navbar) as any
