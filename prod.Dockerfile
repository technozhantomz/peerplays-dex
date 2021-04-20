FROM node:14.16.1-alpine3.13 as build

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
RUN npm run build

FROM nginx:1.19
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
