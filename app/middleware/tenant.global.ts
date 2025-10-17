import type { TenantInfo } from '~/composables/useTenant'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    const event = useRequestEvent()
    const headers = event?.node.req.headers

    // Captura o host (DNS) da requisição
    const host: string = (headers?.host as string) || 'unknown'
    const xForwardedHost: string | string[] | undefined = headers?.['x-forwarded-host']
    const xOriginalHost: string | string[] | undefined = headers?.['x-original-host']

    // Prioriza headers do proxy reverso
    const tenant: string = (xForwardedHost || xOriginalHost || host) as string

    // Extrai apenas o domínio (remove porta se houver)
    const domain: string = tenant.split(':')[0] || 'unknown'

    // Armazena o tenant no contexto da aplicação
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

    // Log para debug (opcional)
    console.log('[Tenant Middleware]', {
      domain,
      host: tenant,
      path: to.path
    })
  }
})
