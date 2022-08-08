# setup docker file for the project
FROM  node:16-alpine3.12

WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/index.js"]
