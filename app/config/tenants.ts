export interface TenantConfig {
  domain: string
  name: string
  allowedRoutes: string[]
  restrictedRoutes?: string[]
}

export const tenantConfigs: Record<string, TenantConfig> = {
  mangrove: {
    domain: 'mangrovelabs.com.br',
    name: 'Mangrove Labs',
    allowedRoutes: ['/', '/about', '/admin', '/admin/dashboard', '/admin/users']
  },
  'test.mangrove': {
    domain: 'test.mangrovelabs.com.br',
    name: 'Mangrove Labs Test',
    allowedRoutes: ['/', '/about', '/test-area'],
    restrictedRoutes: ['/admin']
  },
  default: {
    domain: '*',
    name: 'Default Tenant',
    allowedRoutes: ['/', '/about'],
    restrictedRoutes: ['/admin', '/test-area']
  }
}

export function getTenantConfig(domain: string): TenantConfig {
  const normalizedDomain = domain.toLowerCase()

  if (normalizedDomain.includes('test.mangrovelabs.com.br')) {
    return tenantConfigs['test.mangrove']
  }

  if (normalizedDomain.includes('mangrovelabs.com.br') || normalizedDomain.includes('mangrove')) {
    return tenantConfigs.mangrove
  }

  return tenantConfigs.default
}

export function isRouteAllowed(domain: string, routePath: string): boolean {
  const config = getTenantConfig(domain)

  if (config.restrictedRoutes?.some(route => routePath.startsWith(route))) {
    return false
  }

  if (config.allowedRoutes.includes('*')) {
    return true
  }

  return config.allowedRoutes.some(route => {
    if (route === routePath) return true
    if (route.endsWith('/*') && routePath.startsWith(route.slice(0, -2))) return true
    return false
  })
}
