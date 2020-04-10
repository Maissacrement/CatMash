#!/bin/bash

function prod() {
  yarn build &&\
  node ./lib/App.js
}

function main() {
  prod
}

main
