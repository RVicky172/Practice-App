FROM node:24-alpine AS build
WORKDIR /app

ARG APP_ENV=production
ENV NODE_ENV=production
ENV APP_ENV=${APP_ENV}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx webpack --mode production --env appEnv=${APP_ENV}

FROM nginx:1.30.2-alpine3.23 AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/lib /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
