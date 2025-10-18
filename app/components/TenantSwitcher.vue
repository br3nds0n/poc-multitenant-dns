<template>
  <div v-if="showSwitcher" class="tenant-switcher">
    <div class="switcher-header">
      <h3>🌐 Navegação entre Tenants</h3>
      <p class="current-tenant">Atual: <strong>{{ currentTenant }}</strong></p>
    </div>

    <div class="tenant-list">
      <button
        v-for="tenant in tenants"
        :key="tenant.key"
        @click="switchTenant(tenant)"
        :class="['tenant-button', { active: isCurrentTenant(tenant) }]"
      >
        <span class="tenant-icon">{{ tenant.icon }}</span>
        <div class="tenant-info">
          <span class="tenant-name">{{ tenant.name }}</span>
          <span class="tenant-domain">{{ tenant.domain }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tenants: [
        {
          key: 'mangrove',
          name: 'Mangrove Labs',
          domain: 'mangrovelabs.com.br',
          icon: '🌿',
          port: 3002
        },
        {
          key: 'test',
          name: 'Mangrove Test',
          domain: 'test.mangrovelabs.com.br',
          icon: '🧪',
          port: 3002
        },
        {
          key: 'default',
          name: 'Default',
          domain: 'localhost',
          icon: '🏠',
          port: 3002
        }
      ]
    }
  },
  computed: {
    showSwitcher(): boolean {
      // Só mostra em desenvolvimento (localhost)
      if (import.meta.client) {
        const hostname = window.location.hostname
        const isDev = hostname === 'localhost' ||
                     hostname === '127.0.0.1' ||
                     hostname.includes('sslip.io') ||
                     hostname.includes('.local')

        return isDev
      }
      return false
    },
    currentTenant(): string {
      if (import.meta.client) {
        return window.location.hostname
      }
      return 'unknown'
    }
  },
  methods: {
    isCurrentTenant(tenant: any): boolean {
      if (import.meta.client) {
        const currentHost = window.location.hostname
        return currentHost.includes(tenant.key) ||
               (tenant.key === 'default' && currentHost === 'localhost')
      }
      return false
    },
    switchTenant(tenant: any) {
      if (import.meta.client) {
        const isLocalhost = window.location.hostname === 'localhost' ||
                           window.location.hostname.includes('127.0.0.1') ||
                           window.location.hostname.includes('sslip.io')

        let newUrl
        if (isLocalhost) {
          // Em localhost, usa query parameter para simular tenant
          const protocol = window.location.protocol
          const port = window.location.port ? `:${window.location.port}` : ''
          newUrl = `${protocol}//${window.location.hostname}${port}/?tenant=${tenant.key}`
        } else {
          // Em produção, usa o domínio real
          const protocol = window.location.protocol
          newUrl = `${protocol}//${tenant.domain}:${tenant.port}`
        }

        window.location.href = newUrl
      }
    }
  }
}
</script>

<style scoped>
.tenant-switcher {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  border: 2px solid #e0e0e0;
}

.switcher-header {
  margin-bottom: 1rem;
}

.switcher-header h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
}

.current-tenant {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.current-tenant strong {
  color: #00DC82;
}

.tenant-list {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tenant-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.tenant-button:hover {
  border-color: #00DC82;
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 220, 130, 0.2);
}

.tenant-button.active {
  background: #e8f5e9;
  border-color: #00DC82;
  border-width: 3px;
}

.tenant-icon {
  font-size: 2rem;
}

.tenant-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tenant-name {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.tenant-domain {
  font-size: 0.85rem;
  color: #666;
  font-family: 'Courier New', monospace;
}
</style>
