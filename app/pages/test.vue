<template>
  <div class="container">
    <h1>Página Test - Mangrove Labs</h1>
    <p>Você foi redirecionado para esta página específica!</p>

    <div class="card tenant-info">
      <h2>Informações do Tenant</h2>
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
      <h2>Sobre este redirecionamento</h2>
      <p>O middleware detectou que você está acessando via <strong>test.mangrovelabs.com.br</strong></p>
      <p>Automaticamente, todas as requisições deste domínio são redirecionadas para esta página.</p>
    </div>

    <nav class="navigation">
      <NuxtLink to="/">Voltar para Home</NuxtLink>
      <NuxtLink to="/about">Ir para Sobre</NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
// Usar o composable para obter informações do tenant
const { tenant, domain, host } = useTenant()

// Metadata da página
useHead({
  title: `Test Page - ${domain.value}`
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  color: #00DC82;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.card h2 {
  color: #333;
  margin-top: 0;
}

.navigation {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.navigation a {
  color: #00DC82;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid #00DC82;
  border-radius: 4px;
  transition: all 0.3s;
}

.navigation a:hover {
  background: #00DC82;
  color: white;
}

.tenant-info {
  background: #fff3cd;
  border-left: 4px solid #ff9800;
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
  color: #ff9800;
  font-family: 'Courier New', monospace;
  word-break: break-all;
}
</style>
