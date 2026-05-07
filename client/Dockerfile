# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
ARG BACKEND_URL=http://backend:8080
ENV BACKEND_URL=$BACKEND_URL
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV production
ENV BACKEND_URL http://backend:8080

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Server.js is created by Next.js in standalone output
CMD ["node", "server.js"]
