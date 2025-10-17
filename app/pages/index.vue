<template>
  <div class="container">
    <h1>Bem-vindo ao Nuxt</h1>
    <p>Esta é sua página inicial</p>

    <div class="card">
      <h2>Sobre este projeto</h2>
      <p>POC Multi-tenant DNS - Demonstração com Nuxt 4</p>
    </div>


  </div>
</template>

<script setup lang="ts">
// Você pode adicionar lógica aqui
const pageTitle = 'Home'

// Metadata da página
useHead({
  title: pageTitle
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
}

.navigation a {
  color: #00DC82;
  text-decoration: none;
  font-weight: 500;
}

.navigation a:hover {
  text-decoration: underline;
}
</style>
