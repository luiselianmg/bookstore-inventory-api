FROM node:18-alpine AS base
WORKDIR /src/app
COPY package*.json ./
RUN npm install

FROM base AS builder
COPY . .
RUN npm run build

FROM node:18-alpine AS prod
WORKDIR /src/app
COPY package.json ./
RUN npm install --production
COPY --from=builder /src/app/node_modules ./node_modules
COPY --from=builder /src/app/dist ./dist
COPY --from=builder /src/app/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/main"]