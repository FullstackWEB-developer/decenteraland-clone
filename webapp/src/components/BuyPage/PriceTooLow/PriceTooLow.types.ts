import { Dispatch } from 'redux'
import { ChainId, Network } from '@dcl/schemas'
import {
  switchNetworkRequest,
  SwitchNetworkRequestAction
} from 'dcl-dapps/dist/modules/wallet/actions'

export type Props = {
  chainId: ChainId
  network: Network
  onSwitchNetwork: typeof switchNetworkRequest
}

export type MapDispatchProps = Pick<Props, 'onSwitchNetwork'>
export type MapDispatch = Dispatch<SwitchNetworkRequestAction>
