FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
ARG NODE_ENV
ARG MONGO_PROD_DB
# RUN npm run seed
RUN npm run build
RUN npm prune --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]