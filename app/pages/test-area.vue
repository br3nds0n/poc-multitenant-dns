<template>
  <div class="test-area-container">
    <div class="header">
      <h1>🧪 Área de Testes</h1>
      <p class="subtitle">Acesso Exclusivo - Test Mangrove</p>
    </div>

    <div class="alert-box">
      <span class="alert-icon">🔒</span>
      <div class="alert-content">
        <h3>Área Restrita</h3>
        <p>
          Esta página está disponível apenas para o tenant
          <strong>test.mangrovelabs.com.br</strong>
        </p>
      </div>
    </div>

    <div class="card tenant-info">
      <h2>📋 Informações do Tenant Atual</h2>
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

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚙️</div>
        <h3>Configurações de Teste</h3>
        <p>Ambiente configurado para testes e desenvolvimento</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔬</div>
        <h3>Experimentos</h3>
        <p>Teste novas funcionalidades antes da produção</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3>Métricas de Teste</h3>
        <p>Monitore o desempenho em ambiente controlado</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🐛</div>
        <h3>Debug Avançado</h3>
        <p>Ferramentas de depuração e logging detalhado</p>
      </div>
    </div>

    <div class="card test-actions">
      <h2>🚀 Ações de Teste</h2>
      <div class="actions-grid">
        <button class="action-button primary">Executar Teste A</button>
        <button class="action-button secondary">Executar Teste B</button>
        <button class="action-button warning">Simular Erro</button>
        <button class="action-button info">Ver Logs</button>
      </div>
    </div>

    <nav class="navigation">
      <NuxtLink to="/">← Voltar ao Início</NuxtLink>
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
.test-area-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 3rem;
  margin: 0 0 0.5rem 0;
  color: #ff6b6b;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin: 0;
}

.alert-box {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, #fff3cd 0%, #ffe8a1 100%);
  border: 2px solid #ffc107;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.alert-icon {
  font-size: 3rem;
}

.alert-content h3 {
  margin: 0 0 0.5rem 0;
  color: #856404;
}

.alert-content p {
  margin: 0;
  color: #856404;
}

.alert-content strong {
  color: #ff6b6b;
}

.card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  color: #333;
  margin-top: 0;
}

.tenant-info {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
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
  min-width: 120px;
}

.info-item .value {
  color: #2196f3;
  font-family: 'Courier New', monospace;
  word-break: break-all;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: #ff6b6b;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #333;
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.feature-card p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.test-actions {
  background: #f5f5f5;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.action-button {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-button.primary {
  background: #4caf50;
  color: white;
}

.action-button.primary:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.action-button.secondary {
  background: #2196f3;
  color: white;
}

.action-button.secondary:hover {
  background: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}

.action-button.warning {
  background: #ff9800;
  color: white;
}

.action-button.warning:hover {
  background: #f57c00;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
}

.action-button.info {
  background: #9c27b0;
  color: white;
}

.action-button.info:hover {
  background: #7b1fa2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(156, 39, 176, 0.3);
}

.navigation {
  margin-top: 2rem;
  text-align: center;
}

.navigation a {
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  display: inline-block;
  transition: all 0.3s;
}

.navigation a:hover {
  background: #ff6b6b;
  color: white;
}
</style>
