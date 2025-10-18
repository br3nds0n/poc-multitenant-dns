FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app

RUN apk add --no-cache nginx

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/log/nginx /var/lib/nginx/tmp

ENV HOST=0.0.0.0
ENV PORT=3003
ENV NODE_ENV=production

EXPOSE 3002

COPY <<EOF /start.sh
#!/bin/sh
node /app/.output/server/index.mjs &
nginx -g "daemon off;"
EOF

RUN chmod +x /start.sh

CMD ["/start.sh"]
