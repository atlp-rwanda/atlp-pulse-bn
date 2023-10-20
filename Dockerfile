FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
ENV NODE_ENV=production
ENV MONGO_DEV_DB=process.env.MONGO_DEV_DB
ENV ADMIN_EMAIL=process.env.ADMIN_EMAIL
ENV ADMIN_PASS=process.env.ADMIN_PASS

ENV COORDINATOR_EMAIL=process.env.COORDINATOR_EMAIL
ENV COORDINATOR_PASS=process.env.COORDINATOR_PASS

COPY . .
RUN npm run build
RUN npm prune --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]