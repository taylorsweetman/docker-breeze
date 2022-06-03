# Docker Breeze

## Description

Based on [SCM Breeze](https://github.com/scmbreeze/scm_breeze), but for Docker!

This repo is a collection of helpful shell aliases and functions to make working with Docker faster, and smoother. 

Who has time to write out 
```shell
docker run -it --rm ...
``` 
every time you want to run a container!? Not me.

## Current Aliases & Functions

- `d-c` :arrow_right:  `docker-compose`
  - Shortcut for the unfortunately verbose `docker-compose` command.
- `db <IMAGE_NAME>` :arrow_right: `docker build -t <IMAGE_NAME> .`
  - Builds a Docker image with <IMAGE_NAME> from the source code in the current working directory. 
- `dri <IMAGE_NAME> <OPTIONAL_ARGS>` :arrow_right: `docker run -it <IMAGE_NAME> <OPTIONAL_ARGS>`
  - Runs a container in interactive mode based off image: <IMAGE_NAME>. 
  - Will pass <OPTIONAL_ARGS> to the container.
- `drd <IMAGE_NAME> <OPTIONAL_ARGS>` :arrow_right: `docker run -d <IMAGE_NAME> <OPTIONAL_ARGS>`
  - Runs a container in detached mode based off image: <IMAGE_NAME>. 
  - Will pass <OPTIONAL_ARGS> to the container.