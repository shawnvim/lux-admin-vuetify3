FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN --mount=type=secret,id=UNSPLASH_ACCESS_KEY echo VITE_UNSPLASH_ACCESS_KEY=$(cat /run/secrets/UNSPLASH_ACCESS_KEY) >> .env.pro
RUN --mount=type=secret,id=SUPABASE_URL echo VITE_SUPABASE_URL=$(cat /run/secrets/SUPABASE_URL) >> .env.pro
RUN --mount=type=secret,id=SUPABASE_ANON_KEY echo VITE_SUPABASE_ANON_KEY=$(cat /run/secrets/SUPABASE_ANON_KEY) >> .env.pro
RUN git submodule update --init --recursive
RUN npm run build

# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /etc/nginx/html
COPY conf/nginx.conf /etc/nginx/nginx.conf
RUN chmod -R 777 /var/cache/nginx

EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]
