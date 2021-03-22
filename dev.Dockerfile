FROM node:12 

RUN apt-get update && apt-get install build-essential nasm

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ./ /app/

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
