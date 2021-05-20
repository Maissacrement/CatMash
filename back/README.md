# CatMash

## Node

```bash
run server : `yarn dev`
lint : `yarn lint`
test : `yarn test`
build : `yarn build`
```

## Redis DB

### CLI use command line
cmd : `redis-cli`

## Run my micro service on docker

```bash
BUILD: `docker build -t catmash .`
RUN: `docker run -p 8082:8082 -ti -d --name catmashservice catmash`

START: `docker start catmashservice`
STOP: `docker stop catmashservice`
REMOVE: `docker rm catmashservice`
```

## RUN ANY CMDLINE ON ALPINE
cmd: `docker exec -i -t catmashservice ${CMD_LINE}`
