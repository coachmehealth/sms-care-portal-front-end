FROM node:12.18.2

RUN mkdir /app

WORKDIR /app

COPY package.json /app/package.json

COPY yarn.lock /app/yarn.lock

RUN yarn install

RUN yarn global add express

COPY . /app

RUN touch /app/.aptible.env

RUN set -a && . /app/.aptible.env && \
    yarn build

ENV NODE_ENV=production

EXPOSE 3000

# runs both node server.js and node build/start.js
CMD ["yarn", "start"]