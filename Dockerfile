# ==============================================================================
# CHOCOLATES TRONADOR WEB - DOCKERFILE FOR COOLIFY & PRODUCTION DEPLOYMENT
# Multi-stage build: Node 20 (Build) -> Nginx Alpine (Production Serve)
# ==============================================================================

# --- Stage 1: Build Phase ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies clean & fast
RUN npm ci

# Copy application source code and assets
COPY . .

# Build production bundle
RUN npm run build

# --- Stage 2: Production Serving Phase ---
FROM nginx:alpine AS runner

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration for SPA routing & caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port for Coolify reverse proxy (Traefik/Caddy)
EXPOSE 80

# Start Nginx daemon in foreground
CMD ["nginx", "-g", "daemon off;"]
