FROM node:14.16.1-alpine3.13

RUN apk update && apk add g++ make nasm git

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ./ /app/

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
