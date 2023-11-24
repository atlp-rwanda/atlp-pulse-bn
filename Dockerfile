FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
ENV NODE_ENV=production

COPY . .
RUN npm run build
RUN npm prune --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]