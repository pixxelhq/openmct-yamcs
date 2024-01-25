FROM node:20.11.0-alpine

RUN apk update && \
    apk add --update git && \
    apk add --update busybox-extras

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

USER node

COPY --chown=node:node package*.json .
COPY --chown=node:node . .

# To make sure nasa/openmct is installed. Sometimes to cacheMiss, they might be skipped. No clue why
RUN npm run --loglevel verbose build:example:master 
RUN npm install --loglevel verbose

EXPOSE 9000

CMD ["npm", "run", "start:docker"]
