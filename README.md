# 🌿 POC Multi-tenant DNS - Nuxt 3

Aplicação multi-tenant com Nuxt 3 + Nginx, deployada no Coolify (Hostinger VPS).

## ✨ Features

- 🏢 **Multi-tenancy** por domínio/subdomínio
- 🔒 **Proteção de rotas** por tenant
- 🎨 **UI customizada** por tenant (Mangrove Labs, Test, Default)
- 🧪 **Área de testes exclusiva** para tenant específico
- 🔄 **Navegação entre tenants** (apenas em desenvolvimento)
- 🚀 **API REST** com Nuxt server routes
- 🌐 **Nginx** como reverse proxy
- 📦 **Docker** multi-stage build otimizado
- 🔧 **ESLint + Prettier** configurados
- 📝 **EditorConfig** para consistência

## 🚀 Quick Start

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:3002`

### Navegação entre tenants (localhost)

Use o componente TenantSwitcher ou URLs diretas:

```bash
http://localhost:3002/?tenant=mangrove
http://localhost:3002/?tenant=test
http://localhost:3002/?tenant=default
```

## 🏗️ Estrutura do Projeto

```
.
├── app/
│   ├── components/         # Componentes Vue
│   │   ├── MangroveHome.vue
│   │   ├── GenericHome.vue
│   │   └── TenantSwitcher.vue
│   ├── config/            # Configurações de tenants
│   ├── middleware/        # Middleware de proteção
│   ├── pages/             # Páginas (rotas)
│   └── composables/       # Composables reutilizáveis
├── server/
│   └── api/               # API routes
├── nginx/
│   └── nginx.conf         # Configuração Nginx
├── Dockerfile             # Build otimizado
└── nuxt.config.ts         # Configuração Nuxt
```

## 🎯 Tenants Configurados

| Tenant        | Domínio                  | Rotas Permitidas      | Rotas Restritas    |
| ------------- | ------------------------ | --------------------- | ------------------ |
| Mangrove Labs | mangrovelabs.com.br      | /, /about, /admin/\*  | /test-area         |
| Test Mangrove | test.mangrovelabs.com.br | /, /about, /test-area | /admin             |
| Default       | \*                       | /, /about             | /admin, /test-area |

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
```

### Linting e Formatação

```bash
npm run lint         # Verifica problemas de lint
npm run lint:fix     # Corrige problemas automaticamente
npm run format       # Formata todos os arquivos
npm run format:check # Verifica formatação
```

### Setup inicial do linting

```bash
./setup-linting.sh   # Instala e configura tudo
```

## 🐳 Docker

### Build local

```bash
docker build -t poc-multitenant .
docker run -p 3002:3002 poc-multitenant
```

### Variáveis de ambiente

```bash
HOST=0.0.0.0
PORT=3003
NODE_ENV=production
NODE_MEMORY_LIMIT=1024  # Ajustável por VPS
```

## ☁️ Deploy no Coolify

### Guia Rápido

1. Configure variáveis no Coolify:

   ```
   NODE_MEMORY_LIMIT=1024
   NODE_ENV=production
   ```

2. Port mapping: `3002:3002`

3. Resource limits:

   ```
   Memory: 1.5GB
   CPU: 1.0
   ```

4. Push para Git → Deploy automático!

📖 **Documentação completa:** [COOLIFY_QUICK_START.md](./COOLIFY_QUICK_START.md)

## 🔌 API Endpoints

### Health Check

```bash
GET /health
```

### API Mangrove

```bash
GET /api/mangrove

Response:
{
  "success": true,
  "message": "Mangrove API está funcionando!",
  "data": {
    "tenant": "Mangrove Labs",
    "host": "mangrovelabs.com.br",
    "timestamp": "2025-10-18T...",
    "endpoint": "/api/mangrove"
  }
}
```

## 📚 Documentação Adicional

- [LOCALHOST_NAVIGATION.md](./LOCALHOST_NAVIGATION.md) - Navegação entre tenants
- [TEST_AREA_GUIDE.md](./TEST_AREA_GUIDE.md) - Área de testes exclusiva
- [COOLIFY_DEPLOY.md](./COOLIFY_DEPLOY.md) - Deploy completo no Coolify
- [LINTING_GUIDE.md](./LINTING_GUIDE.md) - Guia de linting e formatação

## 🛠️ Tecnologias

- **Nuxt 3** - Framework Vue.js
- **Vue 3** - Composition API
- **TypeScript** - Type safety
- **Nginx** - Reverse proxy
- **Docker** - Containerização
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **Coolify** - Platform de deploy

## 📝 Configuração do Editor

O projeto inclui configurações para VSCode:

- Formatação automática ao salvar
- ESLint com correção automática
- Extensões recomendadas

Instale as extensões sugeridas quando o VSCode perguntar!

## 🔒 Segurança

- Middleware de proteção de rotas server-side
- Validação de tenants por domínio
- Página 403 customizada para acessos negados
- Headers de segurança configurados no Nginx

## 🧪 Testando

### Teste local com diferentes tenants

```bash
# Mangrove Labs (tem acesso a /admin)
curl http://localhost:3002/?tenant=mangrove

# Test Mangrove (tem acesso a /test-area)
curl http://localhost:3002/?tenant=test

# Default (acesso limitado)
curl http://localhost:3002/?tenant=default
```

### Teste de APIs

```bash
# Health check
curl http://localhost:3002/health

# API Mangrove
curl http://localhost:3002/api/mangrove
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Execute linting (`npm run lint:fix`)
4. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Push para a branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 📄 Licença

Projeto privado - Mangrove Labs

## 🐛 Troubleshooting

### Out of memory durante build

Aumente `NODE_MEMORY_LIMIT` no Dockerfile ou nas variáveis de ambiente.

### Container reiniciando no Coolify

Verifique os logs no dashboard e ajuste memory limits.

### ESLint não funciona

```bash
rm -rf node_modules package-lock.json
npm install
```

Recarregue o VSCode: `Ctrl+Shift+P` → "Reload Window"

---

Made with 💚 by Mangrove Labs
