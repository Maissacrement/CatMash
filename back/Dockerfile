# Image Location
FROM node:10-alpine

# MAINTENER
MAINTAINER Maissacrement <emmariodelar@gmail.com>

# WORKSPACE
WORKDIR /app

# INIT DOCKER PROJECT
COPY package.json .
RUN apk update && \
    apk add bash python \
    g++ make && \
    yarn && yarn global add nodemon

# ADD REPO ON DOCKER
COPY . .
RUN chmod +x /app/entrypoint.sh

# FUNCTIONNALITY
ENTRYPOINT ["/app/entrypoint.sh"]
