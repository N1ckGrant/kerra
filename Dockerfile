# Multi-stage build для оптимізації
FROM node:22-alpine AS base

# Встановлюємо pnpm
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM base AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runtime
WORKDIR /app

# Створюємо користувача для безпеки
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

COPY --from=deps --chown=nuxtjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=build --chown=nuxtjs:nodejs /app/package.json ./package.json

USER nuxtjs

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

CMD ["node", ".output/server/index.mjs"]
