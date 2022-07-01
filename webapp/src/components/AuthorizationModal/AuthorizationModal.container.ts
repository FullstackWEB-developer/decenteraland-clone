import { connect } from 'react-redux'
import {
  GRANT_TOKEN_REQUEST,
  REVOKE_TOKEN_REQUEST
} from 'dcl-dapps/dist/modules/authorization/actions'
import { getData as getAuthorizations } from 'dcl-dapps/dist/modules/authorization/selectors'
import { isLoadingType } from 'dcl-dapps/dist/modules/loading/selectors'
import { getLoading } from 'dcl-dapps/dist/modules/authorization/selectors'
import { RootState } from '../../modules/reducer'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch
} from './AuthorizationModal.types'
import AuthorizationModal from './AuthorizationModal'

const mapState = (state: RootState): MapStateProps => ({
  authorizations: getAuthorizations(state),
  isAuthorizing:
    isLoadingType(getLoading(state), GRANT_TOKEN_REQUEST) ||
    isLoadingType(getLoading(state), REVOKE_TOKEN_REQUEST)
})

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(AuthorizationModal)
