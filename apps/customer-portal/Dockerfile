# Declare PORTAL_NAME as a global build argument
ARG PORTAL_NAME="customer"

FROM node:20-alpine AS base

ARG PORTAL_NAME
ENV PORTAL_NAME=${PORTAL_NAME}

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .npmrc ./
# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm ci --force --loglevel=verbose
# RUN npm install --omit=optional --force
# RUN npm install --only=production --force --loglevel=verbose
# RUN npm ci # Use npm ci for deterministic installs

# Rebuild the source code only when needed
FROM base AS builder
#ARG PORTAL_NAME # Re-declare PORTAL_NAME to use in subsequent stages
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
#COPY ./apps/${PORTAL_NAME}-portal ./apps/${PORTAL_NAME}-portal

# Build the Next.js app
RUN npm run build-${PORTAL_NAME}

# Production image, copy all the files and run next
FROM base AS runner
#ARG PORTAL_NAME # Re-declare PORTAL_NAME to use in subsequent stages
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/portal/.next/ ./.next
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/${PORTAL_NAME}-portal/.next/standalone ./.next
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/${PORTAL_NAME}-portal/.next/static ./.next/dist/apps/${PORTAL_NAME}-portal/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PORTAL_NAME}-portal/public .next/apps/${PORTAL_NAME}-portal/public

# COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3200

ENV PORT 3200

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/outputs
CMD HOSTNAME="0.0.0.0" node .next/apps/${PORTAL_NAME}-portal/server.js

