#!/bin/bash

docker run \
  --rm \
  -p 3000:3000 \
  -e "MAX_CONCURRENT_SESSIONS=10" \
  browserless/chrome:latest
