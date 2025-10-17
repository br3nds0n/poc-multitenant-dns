import type { TenantInfo } from '~/composables/useTenant'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    const event = useRequestEvent()
    const headers = event?.node.req.headers

    const host: string = (headers?.host as string) || 'unknown'
    const xForwardedHost: string | string[] | undefined = headers?.['x-forwarded-host']
    const xOriginalHost: string | string[] | undefined = headers?.['x-original-host']

    const tenant: string = (xForwardedHost || xOriginalHost || host) as string
    const domain: string = tenant.split(':')[0] || 'unknown'

    const nuxtApp = useNuxtApp()
    const tenantInfo: TenantInfo = {
      domain,
      host: tenant,
      fullHost: host,
      xForwardedHost,
      xOriginalHost,
      timestamp: new Date().toISOString()
    }

    nuxtApp.payload.tenant = tenantInfo
  }
})
