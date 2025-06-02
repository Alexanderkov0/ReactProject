FROM node:20-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev && npm audit fix --force
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]