FROM node:12 as build

RUN apt-get update && apt-get install build-essential nasm

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

FROM nginx:latest
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
