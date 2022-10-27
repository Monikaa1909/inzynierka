import type { UserModule } from '~/types'

import { createLogto } from '@logto/vue'

export const install: UserModule = ({ app }) => {
  app.use(createLogto, {
    // TODO [$635a80b88b7108067b50a26f]: Dodac env vara na produkcje
    endpoint: `https://3001-${import.meta.env.GITPOD_WORKSPACE_ID}.${import.meta.env.GITPOD_WORKSPACE_CLUSTER_HOST}`,
    appId: 'x7o1RDPyyDlbfokcBzroP',
  })
}
