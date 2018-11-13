FROM node:10.10-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 1000

CMD [ "npm", "start" ]