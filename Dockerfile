FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN --mount=type=secret,id=UNSPLASH_ACCESS_KEY echo VITE_UNSPLASH_ACCESS_KEY=UNSPLASH_ACCESS_KEY > .env
RUN npm run build

# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /etc/nginx/html
COPY conf/nginx.conf /etc/nginx/nginx.conf
RUN chmod -R 777 /var/cache/nginx

EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]
