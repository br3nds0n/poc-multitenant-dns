# Navegação entre Tenants em Localhost

## Como usar

### 1. Iniciar a aplicação

```bash
npm run dev
# ou com Docker
docker run -p 3002:3002 sua-imagem
```

### 2. Acessar diferentes tenants

Você pode navegar entre os tenants de duas formas:

#### Opção 1: Usar o componente TenantSwitcher (Recomendado)

Acesse qualquer página e use o componente **"🌐 Navegação entre Tenants"** que aparece na interface. Clique nos botões para alternar entre:

- 🌿 **Mangrove Labs** (mangrovelabs.com.br)
- 🧪 **Mangrove Test** (test.mangrovelabs.com.br)
- 🏠 **Default** (localhost)

#### Opção 2: Usar URLs com query parameters

Acesse diretamente via URL:

```bash
# Tenant Mangrove
http://localhost:3002/?tenant=mangrove

# Tenant Test
http://localhost:3002/?tenant=test

# Tenant Default
http://localhost:3002/?tenant=default
```

### 3. Como funciona

O middleware `01.tenant.global.ts` detecta quando você está em localhost e permite usar o parâmetro `?tenant=` para simular diferentes domínios:

```typescript
const tenantMap = {
  'mangrove': 'mangrovelabs.com.br',
  'test': 'test.mangrovelabs.com.br',
  'default': 'localhost'
}
```

### 4. Adicionando novos tenants

Para adicionar um novo tenant para testes em localhost:

1. **Edite** `app/components/TenantSwitcher.vue` e adicione ao array `tenants`:

```typescript
{
  key: 'novo-tenant',
  name: 'Novo Tenant',
  domain: 'novo.dominio.com',
  icon: '🆕',
  port: 3002
}
```

2. **Edite** `app/middleware/01.tenant.global.ts` e adicione ao `tenantMap`:

```typescript
const tenantMap: Record<string, string> = {
  'mangrove': 'mangrovelabs.com.br',
  'test': 'test.mangrovelabs.com.br',
  'novo-tenant': 'novo.dominio.com',
  'default': 'localhost'
}
```

3. **Edite** `app/config/tenants.ts` e configure as rotas permitidas:

```typescript
'novo-tenant': {
  domain: 'novo.dominio.com',
  name: 'Novo Tenant',
  allowedRoutes: ['/', '/about'],
  restrictedRoutes: ['/admin']
}
```

## Testando em produção

Para testar com domínios reais usando sslip.io:

```bash
# Acesse via IP com sslip.io
http://mangrove.127.0.0.1.sslip.io:3002
http://test.127.0.0.1.sslip.io:3002
```

O middleware também detecta `sslip.io` e permite o uso de query parameters para facilitar os testes.
