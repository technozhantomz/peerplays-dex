FROM node:8 as builder

RUN apt-get update && apt-get install build-essential nasm && rm -rf /var/lib/apt/lists/*

WORKDIR /source

COPY package.json .

RUN npm install

COPY . .

RUN npm run prod

FROM alpine:latest as deployer

RUN apk update && apk add --no-cache sshpass rsync openssh-client
#RUN apt-get update && apt-get install -y sshpass rsync && rm -rf /var/lib/apt/lists/*

COPY --from=builder /source/dist ./dist

ARG DEPLOY_HOST=127.0.0.1
ARG DEPLOY_PASS=password
ARG DEPLOY_NAME=bitshares-dream

RUN sshpass -p "$DEPLOY_PASS" rsync -e "ssh -o StrictHostKeyChecking=no" -avz --delete ./dist $DEPLOY_HOST:/var/www/$DEPLOY_NAME
