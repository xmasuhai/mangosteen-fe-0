import {createRouter} from 'vue-router'
import {routes} from '@/router/routes.ts'
import {routerHistory} from '@/router/routerHistory.ts'

const router = createRouter({
  history: routerHistory,
  routes,
})

export default router
