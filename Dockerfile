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
CMD ["node", "dist/index.js"]
