FROM node:18-alpine
WORKDIR /app

# Set default values for build arguments
ARG NODE_ENV=production
ARG MONGO_PROD_DB=""
ARG MONGO_DEV_DB=""
ARG ADMIN_EMAIL=""
ARG ADMIN_PASS=""
ARG COORDINATOR_EMAIL=""
ARG COORDINATOR_PASS=""

# Set environment variables using build arguments
ENV NODE_ENV=${NODE_ENV}
ENV MONGO_PROD_DB=${MONGO_PROD_DB}
ENV MONGO_DEV_DB=${MONGO_DEV_DB}
ENV ADMIN_EMAIL=${ADMIN_EMAIL}
ENV ADMIN_PASS=${ADMIN_PASS}
ENV COORDINATOR_EMAIL=${COORDINATOR_EMAIL}
ENV COORDINATOR_PASS=${COORDINATOR_PASS}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]
