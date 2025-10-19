<template>
  <div class="generic-container">
    <h1>Bem-vindo ao Sistema Multi-tenant</h1>
    <p class="subtitle">Aplicação Genérica</p>

    <div class="card tenant-info">
      <h2>📋 Informações do Tenant</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Domínio:</span>
          <span class="value">{{ domain }}</span>
        </div>
        <div class="info-item">
          <span class="label">Host:</span>
          <span class="value">{{ host }}</span>
        </div>
        <div v-if="tenant" class="info-item">
          <span class="label">Timestamp:</span>
          <span class="value">{{ tenant.timestamp }}</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Sobre este sistema</h2>
      <p>Esta é a página genérica do sistema multi-tenant.</p>
      <p>Você está acessando através de um domínio que não possui customização específica.</p>
    </div>

    <div class="info-boxes">
      <div class="info-box">
        <h3>🔧 Configurável</h3>
        <p>Sistema adaptável para diferentes tenants</p>
      </div>
      <div class="info-box">
        <h3>🌐 Multi-tenant</h3>
        <p>Suporte para múltiplos domínios</p>
      </div>
    </div>

    <TenantSwitcher />

    <nav class="navigation">
      <NuxtLink to="/about">Sobre o Sistema</NuxtLink>
      <NuxtLink
        to="/test-area"
        class="test-link-disabled"
        title="Disponível apenas para test.mangrove"
      >
        🔒 Área de Testes
      </NuxtLink>
    </nav>
  </div>
</template>

<script lang="ts">
import type { TenantInfo } from '~/composables/useTenant'

export default {
  computed: {
    tenant(): TenantInfo | null {
      const nuxtApp = useNuxtApp()
      return (nuxtApp.payload.tenant as TenantInfo) || null
    },
    domain(): string {
      return this.tenant?.domain || 'unknown'
    },
    host(): string {
      return this.tenant?.host || 'unknown'
    }
  }
}
</script>

<style scoped>
.generic-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

h1 {
  color: #4a5568;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #718096;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  border: 1px solid #e2e8f0;
}

.card h2 {
  color: #333;
  margin-top: 0;
}

.tenant-info {
  background: #edf2f7;
  border-left: 4px solid #4a5568;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
}

.info-item .label {
  font-weight: 600;
  color: #555;
  min-width: 100px;
}

.info-item .value {
  color: #4a5568;
  font-family: 'Courier New', monospace;
  word-break: break-all;
}

.info-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.info-box {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s;
}

.info-box:hover {
  border-color: #4a5568;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.1);
}

.info-box h3 {
  color: #4a5568;
  margin-top: 0;
}

.info-box p {
  color: #718096;
  margin-bottom: 0;
}

.navigation {
  margin-top: 2rem;
  text-align: center;
}

.navigation a {
  color: #4a5568;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: 2px solid #4a5568;
  border-radius: 8px;
  display: inline-block;
  transition: all 0.3s;
}

.navigation a:hover {
  background: #4a5568;
  color: white;
}

.navigation .test-link-disabled {
  border-color: #ccc;
  color: #999;
  cursor: not-allowed;
  margin-left: 1rem;
}

.navigation .test-link-disabled:hover {
  background: #f5f5f5;
  color: #999;
  transform: none;
}
</style>
