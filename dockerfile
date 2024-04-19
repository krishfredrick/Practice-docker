From node:21-alpine

WORKDIR /.

COPY package.* .
COPY ./prisma .

RUN yarn install
RUN yarn build
RUN yarn prisma generate

COPY . .

EXPOSE  4020
CMD [ "yarn", "start" ]