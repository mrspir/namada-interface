FROM rust:1.79 AS builder
WORKDIR /app

RUN apt update && apt install -y nodejs npm clang pkg-config libssl-dev protobuf-compiler curl
RUN npm install -g yarn

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

# Copy built files
COPY --from=builder /app/apps/namadillo/dist ./dist/

# Copy and setup config script
COPY --chmod=0755 ./docker/namadillo/bootstrap_config.sh ./
RUN ./bootstrap_config.sh

EXPOSE 3020

# Start serve
CMD ["serve", "-s", "dist", "-l", "3020"]
