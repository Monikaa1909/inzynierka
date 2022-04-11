import { useTrainer } from '../stores/trainer'
import type { UserModule } from '~/types'

const useStoreByType = (type: string) => {
  switch (type) {
    case 'trainer':
      return useTrainer()
    case 'academy':
      // return useAcademy()
      // eslint-disable-next-line no-fallthrough
    case 'parent':
      // return useParent()
      // eslint-disable-next-line no-fallthrough
    default:
      return null
  }
}

export const install: UserModule = async({ router }) => {
  router.beforeEach((to) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line no-unreachable-loop
    for (const loginType of to.meta.authorized ?? []) {
      const store = useStoreByType(loginType)
      if (store.value?.token) {
        // TODO: Sprawdzic czy uzytkownik jest zalogowany
        //       Uzywajac endpointu /api/<type>/auth
        return true
      }

      return `/login${loginType[0].toUpperCase()}${loginType.slice(1)}`
    }
  })
}
