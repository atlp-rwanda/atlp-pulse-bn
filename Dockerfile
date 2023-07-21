# setup docker file for the project
FROM  node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build
RUN npm prune --production
EXPOSE 4000
ENV NODE_ENV=production
ENV MONGO_PROD_DB=mongodb+srv://doadmin:e617MB4IVm5rC092@pulse-prod-db-70e37aa6.mongo.ondigitalocean.com/devpulse-backend-staging?tls=true&authSource=admin&replicaSet=pulse-prod-db
CMD ["node", "dist/index.js"]