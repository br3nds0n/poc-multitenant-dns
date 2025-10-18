FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

FROM node:22-alpine AS production
WORKDIR /app

RUN apk add --no-cache nginx

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/log/nginx /var/lib/nginx/tmp

ENV HOST=0.0.0.0
ENV PORT=3003
ENV NODE_ENV=production
ENV NODE_MEMORY_LIMIT=1024

EXPOSE 3002

COPY <<EOF /start.sh
#!/bin/sh
echo "Starting Nuxt with \${NODE_MEMORY_LIMIT}MB memory limit..."
NODE_OPTIONS="--max-old-space-size=\${NODE_MEMORY_LIMIT}" node /app/.output/server/index.mjs &
NUXT_PID=\$!

echo "Starting Nginx..."
nginx -g "daemon off;" &
NGINX_PID=\$!

trap "kill \$NUXT_PID \$NGINX_PID" SIGTERM SIGINT
wait
EOF

RUN chmod +x /start.sh

CMD ["/start.sh"]
