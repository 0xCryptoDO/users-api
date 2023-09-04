FROM node:17

WORKDIR /home/users-api

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3003

CMD ["yarn", "start:prod"]