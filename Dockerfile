# === Stage 1: Build frontend ===
FROM node:20-alpine AS client-build
WORKDIR /app
COPY client ./client
WORKDIR /app/client
RUN npm install && npm run build

# === Stage 2: Build backend ===
FROM node:20-alpine AS server
WORKDIR /app
COPY server ./server
WORKDIR /app/server
RUN npm install

# Copy built frontend into backend's /public folder
RUN mkdir -p /app/server/public
COPY --from=client-build /app/client/dist /app/server/public

# === Stage 3: Run server ===
WORKDIR /app/server
ENV PORT=4000
EXPOSE 4000

CMD ["npm", "run", "start"]
