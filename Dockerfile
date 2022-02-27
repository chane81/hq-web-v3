# step 1: builder
FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
ENV NODE_ENV production
RUN cd /app && echo 'YARN VERSION IN BUILDER: ' && yarn --version
RUN yarn build:prod

# step 2: copy files and run next
FROM node:16-alpine AS runner
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
WORKDIR /app

# You only need to copy next.config.js if you are NOT using the default configuration
# env 폴더는 복사할 필요 없다. 빌드후 빌드파일(.next/*)에 해당값이 들어가므로
# COPY --from=builder /app/ ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/package.json ./package.json

# RUN rm -rf /app/.yarn/unplugged && yarn rebuild
RUN chown -R nextjs:nodejs /app/.next
RUN echo "YARN VERSION IN RUNNER: " && yarn --version

USER nextjs

EXPOSE 8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]