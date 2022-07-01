import { ToastType } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'

export function getStoreUpdateSucessToast() {
  return {
    type: ToastType.INFO,
    title: t('toast.store_update_success.title'),
    body: t('toast.store_update_success.body'),
    timeout: 6000,
    closable: true
  }
}
