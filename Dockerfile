# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage 2: Nginx + Node
FROM node:22-alpine AS production

# Instalar Nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Copiar arquivos necessários do build
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --omit=dev

# Copiar configuração do Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Criar diretórios necessários
RUN mkdir -p /var/log/nginx /run/nginx

# Expor portas
EXPOSE 3002 3000

# Script de inicialização
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'node /app/.output/server/index.mjs &' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Comando para iniciar Nginx e Node
CMD ["/start.sh"]
