<template>
  <div class="error-container">
    <div class="error-content">
      <h1>403</h1>
      <h2>Acesso Negado</h2>

      <div class="error-message">
        <p>Você não tem permissão para acessar esta página com o tenant atual.</p>
        <p class="tenant-info">
          Tenant:
          <strong>{{ domain }}</strong>
        </p>
      </div>

      <div class="actions">
        <button class="btn-primary" @click="goHome">Ir para Home</button>
        <button class="btn-secondary" @click="goBack">Voltar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { TenantInfo } from '~/composables/useTenant'

export default {
  head() {
    return {
      title: '403 - Acesso Negado'
    }
  },
  computed: {
    tenant(): TenantInfo | null {
      const nuxtApp = useNuxtApp()
      return (nuxtApp.payload.tenant as TenantInfo) || null
    },
    domain(): string {
      return this.tenant?.domain || 'unknown'
    }
  },
  methods: {
    goHome() {
      navigateTo('/')
    },
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.error-content {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

h1 {
  font-size: 6rem;
  font-weight: 800;
  margin: 0;
  color: #667eea;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: #333;
}

.error-message {
  margin: 2rem 0;
  color: #666;
  line-height: 1.6;
}

.tenant-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
}

.tenant-info strong {
  color: #667eea;
  font-family: 'Courier New', monospace;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e2e8f0;
  color: #333;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}
</style>
