# -------- Vuejs --------

# Image Location
FROM node:11.14.0-alpine 

# MAINTENER
MAINTAINER Maissacrement <emmariodelar@gmail.com>

# WORKSPACE
WORKDIR /app

COPY package.json .
RUN yarn --production --ignore-optional --verbose && \
    mkdir dist/

COPY . .

RUN ["yarn","build", "--verbose" ]

# -------- NGINX --------

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo "Nginx is runnig on localhost:14525"
