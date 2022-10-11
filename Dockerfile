#Install deps
FROM node:16-alpine as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

ARG github_access_token=defval

#Rebuild source code
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/package.json /app/package-lock.json ./
COPY / .
RUN npm run build:release


FROM node:16-alpine AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 www

COPY --from=builder /app/build/ .
COPY --from=builder /app/node_modules ./node_modules

USER www
EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["node", "bin/www.js"]



