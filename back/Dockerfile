# Image Location
FROM node:16.19.0-alpine

# MAINTENER
MAINTAINER Maissacrement <emmariodelar@gmail.com>

# WORKSPACE
WORKDIR /app

# INIT DOCKER PROJECT
COPY package.json .
RUN apk update && \
    apk add bash python3 g++ make && \
    yarn && yarn global add nodemon

# ADD REPO ON DOCKER
COPY . .
RUN yarn build

# FUNCTIONNALITY
ENTRYPOINT ["/app/entrypoint.sh"]
