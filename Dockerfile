FROM node:8

RUN apt-get update && apt-get install -y sshpass rsync && rm -rf /var/lib/apt/lists/*

WORKDIR /source

COPY package.json .

RUN npm install

COPY . .

RUN npm run prod

ARG DEPLOY_HOST=127.0.0.1
ARG DEPLOY_PASS=password
ARG DEPLOY_NAME=bitshares-dream

RUN sshpass -p "$DEPLOY_PASS" rsync -e "ssh -o StrictHostKeyChecking=no" -avz --delete ./dist $DEPLOY_HOST:/var/www/$DEPLOY_NAME
