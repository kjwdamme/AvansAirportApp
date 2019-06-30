FROM node:8
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9090

CMD ["node", "index.js"]
