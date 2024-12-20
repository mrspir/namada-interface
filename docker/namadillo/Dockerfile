# Thêm buildargs để control cache
ARG BUILDKIT_INLINE_CACHE=1

# Tách phần install dependencies
FROM rust:1.79 AS deps
WORKDIR /app

# Cài đặt nodejs và corepack
RUN apt update && apt install -y nodejs npm && \
    npm install -g corepack && \
    corepack enable && \
    corepack prepare yarn@4.0.2 --activate

COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn/
COPY apps/namadillo/package.json ./apps/namadillo/
COPY packages/sdk/package.json ./packages/sdk/
RUN yarn install

# Build stage
FROM rust:1.79 AS builder
WORKDIR /app

# Copy deps từ stage trước
COPY --from=deps /app/node_modules ./node_modules

RUN apt update && apt install -y nodejs npm clang pkg-config libssl-dev protobuf-compiler curl && \
    npm install -g corepack && \
    corepack enable && \
    corepack prepare yarn@4.0.2 --activate

RUN rustup target add wasm32-unknown-unknown
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y

COPY .yarnrc.yml tsconfig.base.json package.json yarn.lock ./
COPY ./.yarn ./.yarn/
COPY ./packages ./packages/
COPY ./scripts ./scripts/
COPY ./apps/namadillo/package.json ./apps/namadillo/

RUN yarn 

WORKDIR /app/apps/namadillo
COPY ./apps/namadillo/scripts ./scripts/

RUN yarn wasm:build

COPY ./apps/namadillo .
RUN yarn && yarn build

# Production stage - using serve instead of nginx
FROM node:18-alpine
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files and config
COPY --from=builder /app/apps/namadillo/dist ./dist/

# Tạo config.toml trong thư mục dist
COPY --chmod=0755 ./docker/namadillo/bootstrap_config.sh ./
RUN mkdir -p ./dist && \
    CONFIG_PATH="./dist/config.toml" ./bootstrap_config.sh

EXPOSE 3020

CMD ["serve", "-s", "dist", "-l", "3020", "--cors"]