FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
# ENV NODE_ENV=production
ENV NODE_ENV=development
ENV ADMIN_EMAIL=devpulseadmn@gmail.com
ENV ADMIN_PASS=yptbizlxrzfnyzon
ENV COORDINATOR_EMAIL=coordinatordevpulse@gmail.com
ENV COORDINATOR_PASS=zrvxpvihyyyhdxcp
COPY . .
RUN npm run build
RUN npm run seed
RUN npm prune --production
EXPOSE 4000
CMD ["node", "dist/index.js"]