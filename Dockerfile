# Build stage
FROM node:18-alpine as builder

# Cài đặt các dependencies cần thiết
RUN apk add --no-cache python3 make g++ curl protoc rust cargo

# Cài đặt wasm-pack
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY apps/namadillo/package.json ./apps/namadillo/
COPY packages/sdk/package.json ./packages/sdk/

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build WASM và ứng dụng
RUN cd apps/namadillo && \
    yarn wasm:build && \
    yarn build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/apps/namadillo/dist /usr/share/nginx/html

# Copy NGINX config
COPY docker/namadillo-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 