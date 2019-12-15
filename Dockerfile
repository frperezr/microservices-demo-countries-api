FROM node:alpine

WORKDIR /countries-api

COPY ./package.json ./

RUN yarn install --production=true
# RUN yarn install

COPY dist /countries-api/dist
COPY bin/goose /usr/bin/goose
COPY bin/wait-db /usr/bin/wait-db
COPY src/database/migrations /migrations
COPY pb /countries-api/pb

EXPOSE 3030

CMD ["/bin/sh", "-l", "-c", "wait-db && goose -dir /migrations postgres ${POSTGRES_DSN} up && yarn start"]