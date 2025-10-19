<template>
  <div class="mangrove-container">
    <div class="hero">
      <h1>Bem-vindo à Mangrove Labs</h1>
      <p class="tagline">Inovação e Tecnologia</p>
    </div>

    <div class="card tenant-info">
      <h2>🌿 Informações do Tenant - Mangrove</h2>
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

    <div class="features">
      <div class="feature-card">
        <h3>🚀 Desenvolvimento</h3>
        <p>Soluções modernas com as melhores tecnologias</p>
      </div>
      <div class="feature-card">
        <h3>🔒 Segurança</h3>
        <p>Proteção de dados em primeiro lugar</p>
      </div>
      <div class="feature-card">
        <h3>⚡ Performance</h3>
        <p>Aplicações rápidas e escaláveis</p>
      </div>
    </div>

    <div class="card about">
      <h2>Sobre a Mangrove Labs</h2>
      <p>Somos especializados em desenvolvimento de software de alta qualidade.</p>
      <p>Esta é uma página customizada para o domínio Mangrove Labs.</p>
    </div>

    <div class="card api-test">
      <h2>🔌 Teste de API</h2>
      <button class="api-button" @click="testApi">Chamar API Mangrove</button>
      <div v-if="apiResponse" class="api-response">
        <h3>Resposta da API:</h3>
        <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
    </div>

    <TenantSwitcher />

    <nav class="navigation">
      <NuxtLink to="/about">Saiba mais sobre nós</NuxtLink>
      <NuxtLink v-if="isTestTenant" to="/test-area" class="test-link">🧪 Área de Testes</NuxtLink>
    </nav>
  </div>
</template>

<script lang="ts">
import type { TenantInfo } from '~/composables/useTenant'

export default {
  data() {
    return {
      apiResponse: null as any
    }
  },
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
    },
    isTestTenant(): boolean {
      return this.domain.toLowerCase().includes('test.mangrove')
    }
  },
  methods: {
    async testApi() {
      try {
        const response = await $fetch('/api/mangrove')
        this.apiResponse = response
        console.log('API Response:', response)
      } catch (error) {
        console.error('Erro ao chamar API:', error)
        this.apiResponse = { error: 'Erro ao chamar API', details: String(error) }
      }
    }
  }
}
</script>

<style scoped>
.mangrove-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #00dc82 0%, #00a05a 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.tagline {
  font-size: 1.5rem;
  opacity: 0.95;
  margin: 0;
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

.tenant-info {
  background: #e8f5e9;
  border-left: 4px solid #00dc82;
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
  color: #00dc82;
  font-family: 'Courier New', monospace;
  word-break: break-all;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  background: white;
  border: 2px solid #00dc82;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 220, 130, 0.3);
}

.feature-card h3 {
  color: #00dc82;
  margin-top: 0;
}

.about {
  background: linear-gradient(to right, #f8f9fa, #e8f5e9);
}

.navigation {
  margin-top: 2rem;
  text-align: center;
}

.navigation a {
  color: #00dc82;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #00dc82;
  border-radius: 8px;
  display: inline-block;
  transition: all 0.3s;
}

.navigation a:hover {
  background: #00dc82;
  color: white;
}

.navigation .test-link {
  border-color: #ff6b6b;
  color: #ff6b6b;
  margin-left: 1rem;
}

.navigation .test-link:hover {
  background: #ff6b6b;
  color: white;
}

.api-test {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
}

.api-button {
  background: #ff9800;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1rem;
}

.api-button:hover {
  background: #f57c00;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
}

.api-response {
  margin-top: 1rem;
  padding: 1rem;
  background: #263238;
  border-radius: 8px;
  color: #aed581;
}

.api-response h3 {
  color: #fff;
  margin-top: 0;
  font-size: 1rem;
}

.api-response pre {
  margin: 0;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}
</style>
