# setup docker file for the project
FROM  node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci 
ENV NODE_ENV=production
ENV MONGO_PROD_DB=mongodb+srv://doadmin:e617MB4IVm5rC092@pulse-prod-db-70e37aa6.mongo.ondigitalocean.com/devpulse-backend-staging?tls=true&authSource=admin&replicaSet=pulse-prod-db
COPY . .
RUN npm run build
RUN npm run seed
RUN npm prune --production
EXPOSE 4000

CMD ["node", "dist/index.js"]