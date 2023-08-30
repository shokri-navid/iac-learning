FROM node:19 as base

WORKDIR order-app

COPY package*.json .
RUN npm i

COPY . .

FROM base as production 
ENV NODE_PATH=./build
RUN npm run build

CMD [ "npm", "run", "start" ]