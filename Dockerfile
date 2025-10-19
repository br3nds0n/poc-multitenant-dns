# ================================
# 🏗️ Fase 1 — Build da aplicação
# ================================
FROM node:22-alpine AS builder
WORKDIR /app

# Instala dependências necessárias (git + bash)
RUN apk add --no-cache git bash

# Define ambiente e memória do Node
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm ci

# Copia o restante do código e faz o build
COPY . .
RUN npm run build


# ===================================
# 🚀 Fase 2 — Execução com Nginx
# ===================================
FROM node:22-alpine AS runner
WORKDIR /app

# Instala Nginx
RUN apk add --no-cache nginx

# Copia o build do Nuxt
COPY --from=builder /app/.output .output
COPY --from=builder /app/package*.json ./

# Copia configuração customizada do Nginx (se tiver)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta padrão
EXPOSE 3000

# Comando de inicialização
CMD ["node", ".output/server/index.mjs"]
