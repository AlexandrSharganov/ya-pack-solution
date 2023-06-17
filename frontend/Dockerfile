FROM node:18.12.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD npm start

# docker run --name yapack-front -it -p 3000:3000 yapack-front