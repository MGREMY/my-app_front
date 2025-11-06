FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm i --frozen-lockfile
COPY . ./
RUN pnpm exec nx run my-app:build:production

FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=build app/dist/apps/my-app/browser/ /usr/share/nginx/html
COPY docker/my-app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

COPY --chmod=755 docker/my-app/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
