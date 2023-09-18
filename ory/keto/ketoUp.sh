#!/bin/bash

set -e

DOCKER_IMAGE=oryd/keto:v0.11.1-alpha.0

# Pull docker image
docker pull $DOCKER_IMAGE

# Create a network for the services to communicate
docker network create keto_network

# Start the keto service
docker run --name keto \
           --network keto_network \
           -p 4466:4466 \
           -p 4467:4467 \
           -v "$(pwd):/home/ory" \
           --restart on-failure \
           $DOCKER_IMAGE \
           serve -c /home/ory/keto.yml

# Start the keto-init service
docker run --name keto-init \
           --network keto_network \
           -e KETO_WRITE_REMOTE=keto:4467 \
           -v "$(pwd):/home/ory" \
           --restart on-failure \
           $DOCKER_IMAGE \
           relation-tuple create /home/ory/relation-tuples
