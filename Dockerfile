FROM node:13.8.0 AS client-build
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN cd client && npm install && npm run build

FROM node:13.8.0 AS server-build
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN cd server && npm install
COPY server/app.js ./server/

EXPOSE 3000
CMD ["node", "./server/app.js"]