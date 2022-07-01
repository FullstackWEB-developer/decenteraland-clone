import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Wallet } from 'dcl-dapps/dist/modules/wallet/types'
import { Authorization } from 'dcl-dapps/dist/modules/authorization/types'

export type Props = {
  wallet: Wallet | null
  authorizations: Authorization[]
  isLoadingAuthorization: boolean
  hasError: boolean
  isConnecting: boolean
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<
  Props,
  | 'wallet'
  | 'authorizations'
  | 'isLoadingAuthorization'
  | 'isConnecting'
  | 'hasError'
>
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
