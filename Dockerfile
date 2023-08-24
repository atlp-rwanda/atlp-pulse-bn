
# setup docker file for the project
FROM  node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci 
ENV NODE_ENV=production
ENV MONGO_PROD_DB=mongodb+srv://doadmin:e617MB4IVm5rC092@pulse-prod-db-70e37aa6.mongo.ondigitalocean.com/devpulse-backend-staging?tls=true&authSource=admin&replicaSet=pulse-prod-db
ENV ADMIN_EMAIL=devpulseadmn@gmail.com
ENV ADMIN_PASS=yptbizlxrzfnyzon
ENV COORDINATOR_EMAIL=coordinatordevpulse@gmail.com
ENV COORDINATOR_PASS=zrvxpvihyyyhdxcp
ENV REGISTER_FRONTEND_URL=https://beta.devpulse.org/register
ENV REGISTER_ORG_FRONTEND_URL=https://beta.devpulse.org/signup/org
ENV FRONTEND_LINK=https://beta.devpulse.org
COPY . .
RUN npm run build
RUN npm run seed
RUN npm prune --production
EXPOSE 4000
CMD ["node", "dist/index.js"]