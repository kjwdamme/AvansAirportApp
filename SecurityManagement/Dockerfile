FROM node:8
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4040

CMD ["node", "index.js"]
