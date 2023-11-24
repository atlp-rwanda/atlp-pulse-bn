FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
ENV NODE_ENV=development
ENV MONGO_PROD_DB=mongodb+srv://doadmin:e617MB4IVm5rC092@pulse-prod-db-70e37aa6.mongo.ondigitalocean.com/devpulse-backend-staging?tls=true&authSource=admin&replicaSet=pulse-prod-db
ENV MONGO_DEV_DB=mongodb+srv://khaleb_:rewqilike3@pulse-bn.kyelrra.mongodb.net/?retryWrites=true&w=majority
ENV ADMIN_EMAIL=process.env.ADMIN_EMAIL
ENV ADMIN_PASS=process.env.ADMIN_PASS
ENV EMAIL_USER=dev.pulse.andela@gmail.com
ENV EMAIL_PASS=uwwwvjujvwcgupns

ENV ADMIN_EMAIL=devpulseadmn@gmail.com
ENV ADMIN_PASS=yptbizlxrzfnyzon
ENV COORDINATOR_EMAIL=process.env.COORDINATOR_EMAIL
ENV COORDINATOR_PASS=process.env.COORDINATOR_PASS

COPY . .
RUN npm run build
RUN npm prune --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]