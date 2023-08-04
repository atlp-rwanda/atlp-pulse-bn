# setup docker file for the project
FROM  node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
ENV NODE_ENV=development
ENV MONGO_DEV_DB=mongodb+srv://rdukuzeyez:R1MiQKulRqfqS8k8@cluster0.qsatykz.mongodb.net/devPulse?retryWrites=true&w=majority
ENV MONGO_PROD_DB=mongodb+srv://doadmin:e617MB4IVm5rC092@pulse-prod-db-70e37aa6.mongo.ondigitalocean.com/devpulse-backend-staging?tls=true&authSource=admin&replicaSet=pulse-prod-db
ENV MONGO_DEV_DB=mongodb+srv://oliviertech212:rtgmP8aMxYvK6MI4@cluster0.ie14wco.mongodb.net/devpulsebn?retryWrites=true&w=majority
COPY . .
RUN npm run build
RUN npm run seed
RUN npm prune --production
EXPOSE 4000
CMD ["node", "dist/index.js"]