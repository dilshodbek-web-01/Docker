FROM node:18.16.0-alpine AS build

ENV TZ UTC
ENV NODE_ENV deveploment

WORKDIR /app

COPY . .

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm config set store-dir .pnpm
RUN pnpm install --prefer-offline --frozen-lockfile

FROM node:18.16.0-alpine

ENV TZ UTC
ENV NODE_ENV production

USER node

WORKDIR /app

CMD npx prisma migrate deploy && node dist/main.js

# docker run \
#   --env TZ=UTC \
#   --env POSTGRES_DB=postgres \
#   --env POSTGRES_USER=postgres \
#   --env POSTGRES_PASSWORD=01023dk \
#   --env POSTGRES_HOST_AUTH_METHOD=trust \
#   --name postgres \
#   --publish 5433:5432 \
#   --restart unless-stopped \
#   --volume postgres_data:/var/lib/postgresql/data \
#   --detach postgres:alpine