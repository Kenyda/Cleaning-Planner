FROM node:16-alpine as build-image

WORKDIR /app

COPY . .

RUN npm install \
    && npm run build


FROM nginx:1.21.3-alpine

COPY --from=build-image /app/dist /www/data/app

RUN rm /etc/nginx/conf.d/*.conf
COPY ./build_configs/nginx.conf /etc/nginx/conf.d/app.conf

CMD nginx -g 'daemon off;'
