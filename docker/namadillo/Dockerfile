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

# Production stage
FROM nginx:alpine
WORKDIR /app

COPY --from=builder /app/apps/namadillo/dist /usr/share/nginx/html/

# Simple nginx config
RUN echo 'server { \n\
    listen 3020; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

COPY --chmod=0755 ./docker/namadillo/bootstrap_config.sh /docker-entrypoint.d/bootstrap_config.sh
RUN chown nginx:nginx /docker-entrypoint.d/bootstrap_config.sh
