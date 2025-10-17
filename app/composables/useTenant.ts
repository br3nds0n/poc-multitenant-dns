export interface TenantInfo {
  domain: string
  host: string
  fullHost?: string
  xForwardedHost?: string | string[]
  xOriginalHost?: string | string[]
  timestamp: string
}

export const useTenant = () => {
  const nuxtApp = useNuxtApp()

  const tenant = computed<TenantInfo | null>(() => {
    return nuxtApp.payload.tenant || null
  })

  const domain = computed(() => tenant.value?.domain || 'unknown')
  const host = computed(() => tenant.value?.host || 'unknown')

  return {
    tenant,
    domain,
    host
  }
}
