import type { TenantInfo } from '~/composables/useTenant'

export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server) {
    const event = useRequestEvent()
    const headers = event?.node.req.headers

    const host: string = (headers?.host as string) || 'unknown'
    const xForwardedHost: string | string[] | undefined = headers?.['x-forwarded-host']
    const xOriginalHost: string | string[] | undefined = headers?.['x-original-host']

    let tenant: string = (xForwardedHost || xOriginalHost || host) as string
    let domain: string = tenant.split(':')[0] || 'unknown'

    // Em localhost, permite override via query parameter
    const isLocalhost =
      domain === 'localhost' || domain.includes('127.0.0.1') || domain.includes('sslip.io')
    if (isLocalhost && to.query.tenant) {
      const tenantParam = to.query.tenant as string
      // Mapeia os tenants simulados
      const tenantMap: Record<string, string> = {
        mangrove: 'mangrovelabs.com.br',
        test: 'test.mangrovelabs.com.br',
        default: 'localhost'
      }
      domain = tenantMap[tenantParam] || domain
      tenant = domain
    }

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
