FROM node:8.11.4-alpine

RUN apk add --update nodejs nodejs-npm
RUN npm install ws

EXPOSE 8080

ENTRYPOINT ["/usr/bin/node", "/root/server.js"]
