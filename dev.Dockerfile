FROM node:14.18.2-alpine3.13

RUN apk update && apk add \
    g++ \
    make \
    nasm \
    git \
    libtool \
    autoconf \
    automake \
    libpng-dev \
    pkgconfig

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ./ /app/

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
