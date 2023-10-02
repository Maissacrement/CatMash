# -------- Vuejs --------

# Image Location
FROM node:16.19.0-alpine

# MAINTENER
MAINTAINER Maissacrement <emmariodelar@gmail.com>

# WORKSPACE
WORKDIR /app

COPY package.json .
RUN yarn global add npm@8.19.3 fork-ts-checker-webpack-plugin-v5@latest
RUN yarn --production --ignore-optional --verbose && \
    mkdir dist

COPY . .

#ENTRYPOINT ["tail", "-f", "/dev/null"]

RUN yarn add fork-ts-checker-webpack-plugin-v5@latest

RUN ["yarn","build", "--verbose" ]
#
## -------- NGINX --------
#
FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo "Nginx is runnig on localhost:14525"
