export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    const event = useRequestEvent()
    const headers = event?.node.req.headers

    // Captura o host (DNS) da requisição
    const host = headers?.host || 'unknown'
    const xForwardedHost = headers?.['x-forwarded-host']
    const xOriginalHost = headers?.['x-original-host']

    // Prioriza headers do proxy reverso
    const tenant = (xForwardedHost || xOriginalHost || host) as string

    // Extrai apenas o domínio (remove porta se houver)
    const domain = tenant.split(':')[0]

    // Armazena o tenant no contexto da aplicação
    const nuxtApp = useNuxtApp()
    nuxtApp.payload.tenant = {
      domain,
      host: tenant,
      fullHost: host,
      xForwardedHost,
      xOriginalHost,
      timestamp: new Date().toISOString()
    }

    // Log para debug (opcional)
    console.log('[Tenant Middleware]', {
      domain,
      host: tenant,
      path: to.path
    })
  }
})
