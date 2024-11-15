FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install

COPY . /usr/src/app
EXPOSE 3000

RUN yarn build

CMD node build/server.mjs