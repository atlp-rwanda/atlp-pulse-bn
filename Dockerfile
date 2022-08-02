# setup docker file for the project
FROM  node:16.9.0

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 4000
CMD ["node", "dist/index.js"]
