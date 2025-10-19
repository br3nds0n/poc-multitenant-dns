<template>
  <div>
    <!-- Renderiza componente Mangrove se o domínio contém "mangrove" -->
    <MangroveHome v-if="isMangrove" />

    <!-- Renderiza componente genérico para outros domínios -->
    <GenericHome v-else />
  </div>
</template>

<script lang="ts">
import type { TenantInfo } from '~/composables/useTenant'

export default {
  head() {
    return {
      title: this.isMangrove ? `Mangrove Labs - ${this.domain}` : `Home - ${this.domain}`
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
    isMangrove(): boolean {
      return this.domain.toLowerCase().includes('mangrove')
    }
  }
}
</script>
