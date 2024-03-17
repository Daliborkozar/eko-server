FROM node:20.11.1-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5001

CMD ["node", "src/server.js"]