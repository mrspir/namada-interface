FROM rust:1.79 AS builder
WORKDIR /app

# Install system dependencies
RUN apt update && apt install -y \
    nodejs \
    npm \
    clang \
    pkg-config \
    libssl-dev \
    protobuf-compiler \
    curl \
    build-essential \
    binaryen   # For wasm-opt

# Install yarn and wasm-pack
RUN npm install -g yarn && \
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y

# Add wasm target
RUN rustup target add wasm32-unknown-unknown

# Copy package files first for better caching
COPY .yarnrc.yml tsconfig.base.json package.json yarn.lock ./
COPY ./.yarn ./.yarn/
COPY ./packages ./packages/
COPY ./scripts ./scripts/
COPY ./apps/namadillo/package.json ./apps/namadillo/

# Install dependencies
RUN yarn install

# Set up workdir for namadillo
WORKDIR /app/apps/namadillo
COPY ./apps/namadillo/scripts ./scripts/

# Build WASM with explicit version
ENV WASM_PACK_VERSION=0.12.1
RUN yarn wasm:build

# Copy and build app
COPY ./apps/namadillo .
RUN yarn && yarn build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/apps/namadillo/dist ./dist/

# Create config directory and copy config script
RUN mkdir -p ./dist
COPY --chmod=0755 ./docker/namadillo/bootstrap_config.sh ./
RUN ./bootstrap_config.sh

EXPOSE 3020

# Start serve with specific configuration
CMD ["serve", "-s", "dist", "-l", "3020", "--cors"]
