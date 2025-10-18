# Guia da Área de Testes Exclusiva

## Visão Geral

Foi criada uma página exclusiva `/test-area` que **apenas** o tenant `test.mangrovelabs.com.br` pode acessar.

## Estrutura

### 1. Página de Testes (`/app/pages/test-area.vue`)

Página completa com:
- 🧪 Interface de testes exclusiva
- 🔒 Alerta de área restrita
- 📋 Informações do tenant atual
- ⚙️ Cards de features (Configurações, Experimentos, Métricas, Debug)
- 🚀 Botões de ações de teste

### 2. Configuração de Permissões (`/app/config/tenants.ts`)

```typescript
'test.mangrove': {
  domain: 'test.mangrovelabs.com.br',
  name: 'Mangrove Labs Test',
  allowedRoutes: ['/', '/about', '/test-area'],  // ✅ Tem acesso
  restrictedRoutes: ['/admin']
},
'mangrove': {
  domain: 'mangrovelabs.com.br',
  name: 'Mangrove Labs',
  allowedRoutes: ['/', '/about', '/admin', '/admin/dashboard', '/admin/users'],
  // ❌ Não tem /test-area na lista
},
'default': {
  domain: '*',
  name: 'Default Tenant',
  allowedRoutes: ['/', '/about'],
  restrictedRoutes: ['/admin', '/test-area']  // ❌ Bloqueado explicitamente
}
```

### 3. Links Condicionais

**No MangroveHome.vue:**
- Link para área de testes aparece **APENAS** se for tenant test.mangrove
- Usa `v-if="isTestTenant"` para mostrar condicionalmente

**No GenericHome.vue:**
- Link aparece **desabilitado** com ícone de cadeado 🔒
- Mostra tooltip: "Disponível apenas para test.mangrove"
- Estilo visual indica que está bloqueado

## Como Testar

### 1. Acesso Permitido (Test Tenant)

```bash
# Em localhost
http://localhost:3002/?tenant=test

# Com sslip.io
http://test.127.0.0.1.sslip.io:3002/test-area

# Em produção
http://test.mangrovelabs.com.br:3002/test-area
```

**Resultado:** ✅ Acesso concedido, página carrega normalmente

### 2. Acesso Negado (Outros Tenants)

```bash
# Mangrove principal
http://localhost:3002/?tenant=mangrove
# Depois tente acessar: /test-area

# Default
http://localhost:3002/?tenant=default
# Depois tente acessar: /test-area
```

**Resultado:** ❌ Redirecionado para `/403` (Acesso Negado)

## Navegação Visual

### Usando o TenantSwitcher

1. Acesse qualquer página da aplicação
2. Veja o componente "🌐 Navegação entre Tenants"
3. Clique em **🧪 Mangrove Test**
4. Agora o link **🧪 Área de Testes** aparecerá no menu
5. Clique para acessar a página exclusiva

### Mudando de Tenant

1. Troque para **🌿 Mangrove Labs** ou **🏠 Default**
2. O link da área de testes:
   - Desaparece (no Mangrove principal)
   - Fica desabilitado com 🔒 (no Default)
3. Tentar acessar `/test-area` diretamente → 403 Error

## Middleware de Proteção

O middleware `02.route-protection.global.ts` verifica:

1. Qual é o tenant atual (via domain)
2. Qual rota está sendo acessada
3. Consulta `isRouteAllowed(domain, route)` em `tenants.ts`
4. Se não permitido → redireciona para `/403`

## Adicionando Novas Rotas Exclusivas

Para criar uma nova rota exclusiva para um tenant:

1. **Crie a página** em `/app/pages/sua-rota.vue`

2. **Configure em `tenants.ts`:**
```typescript
'seu-tenant': {
  domain: 'seu.dominio.com',
  name: 'Seu Tenant',
  allowedRoutes: ['/', '/sua-rota'],  // Adicione aqui
}
```

3. **Bloqueie nos outros tenants:**
```typescript
'outros-tenants': {
  restrictedRoutes: ['/sua-rota']  // Adicione aqui
}
```

4. **Adicione link condicional no componente:**
```vue
<NuxtLink to="/sua-rota" v-if="isSeuTenant">
  Sua Rota
</NuxtLink>
```

## Recursos da Página de Testes

- ✅ Design exclusivo com tema vermelho/laranja
- ✅ Informações do tenant em tempo real
- ✅ Cards de features interativos com hover effects
- ✅ Botões de ação coloridos (Teste A/B, Simular Erro, Ver Logs)
- ✅ Link de volta para home
- ✅ Totalmente responsivo

## Segurança

- 🔒 Proteção no lado do servidor (middleware)
- 🔒 Links condicionais no lado do cliente (UX)
- 🔒 Página 403 customizada para acessos negados
- 🔒 Validação dupla: allowedRoutes + restrictedRoutes
