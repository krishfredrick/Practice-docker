From node:21-alpine

WORKDIR /app

COPY package.* .

RUN yarn install

COPY . .

RUN yarn prisma generate

RUN yarn build


EXPOSE  4020
CMD [ "yarn", "start" ]