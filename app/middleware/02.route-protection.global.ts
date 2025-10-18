import { isRouteAllowed } from '~/config/tenants'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    const nuxtApp = useNuxtApp()
    const tenant = nuxtApp.payload.tenant

    if (!tenant) {
      return
    }

    const domain: string = tenant.domain || 'unknown'
    const routePath: string = to.path

    const allowed = isRouteAllowed(domain, routePath)

    // if (!allowed) {
    //   return navigateTo('/403')
    // }
  }
})
