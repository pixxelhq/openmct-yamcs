FROM node:20.11.0-slim

USER node
WORKDIR /home/node/app

COPY --chown=node:node package*.json .

RUN npm install --prefix /home/node/app --loglevel verbose

COPY --chown=node:node . .

EXPOSE 9000

CMD ["npm", "start"]
