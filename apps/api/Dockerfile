ARG BUN_VERSION=1.2.4

ARG YARN_PKG_MANAGER="this.packageManager=\"yarn@1.22.22\""
ARG BUN_PKG_MANAGER="this.packageManager=\"bun@${BUN_VERSION}\""

FROM oven/bun:${BUN_VERSION}-alpine AS base

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# ------------------------------------------------------------------
FROM base AS dev-pruned

ARG YARN_PKG_MANAGER

# Turbo prune not supported for Bun!
RUN apk add --no-cache yarn
COPY . .
RUN bunx --bun json -I -f package.json -e ${YARN_PKG_MANAGER}
RUN yarn install --ignore-scripts --ignore-optional --prefer-offline --no-bin-links
RUN bunx --bun turbo prune --scope="api" --docker

# ------------------------------------------------------------------
FROM base AS dev-deps

WORKDIR /tmp/dev
COPY --from=dev-pruned /usr/src/app/out/json/ ./
RUN bunx json -I -f package.json -e ${BUN_PKG_MANAGER}
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --save-text-lockfile

# ------------------------------------------------------------------
FROM base AS prod-deps

WORKDIR /tmp/prod
COPY --from=dev-pruned /usr/src/app/out/json/ ./
RUN bunx json -I -f package.json -e ${BUN_PKG_MANAGER}
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --save-text-lockfile --production

# ------------------------------------------------------------------
FROM base AS build

COPY --from=dev-pruned /usr/src/app/out/full/ ./
COPY --from=dev-deps /tmp/dev/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_OUTPUT_MODE=standalone

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN cd apps/api && bunx --bun turbo run build

# ------------------------------------------------------------------
FROM base AS release

WORKDIR /app
RUN addgroup -S -g 1001 nodejs
RUN adduser -S -u 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /usr/src/app/apps/api/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /usr/src/app/apps/api/.next/static ./apps/api/.next/static

USER nextjs

EXPOSE 3000/tcp
ENV PORT=3000
ENV NODE_ENV=production

ENTRYPOINT [ "bun", "apps/api/server.js" ]