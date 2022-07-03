# Docker Breeze

## Description

Based on [SCM Breeze](https://github.com/scmbreeze/scm_breeze), but for Docker!

This repo is a collection of helpful shell aliases and functions to make working with Docker faster, and smoother.

Who has time to write out

```shell
docker run -it --rm ...
```

every time you want to run a container!? Not me.

## Installation

This CLI is currently available for `bash` and `zsh` via the installation script.

```shell
git clone https://github.com/taylorsweetman/docker-breeze.git ~/.docker_breeze
~/.docker_breeze/install.sh
source ~/.bashrc   # or source "${ZDOTDIR:-$HOME}/.zshrc"
```

**Note:**

In order for Docker Breeze to work properly, your user must be a member of the docker group.

If this is not the case, run the following:

```shell
sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker
```

## Current Aliases & Functions

- ### Docker Compose

  - `d-c` :arrow_right: `docker-compose`
  - Shortcut for the unfortunately verbose `docker-compose` command.

- ### Docker Build

  - `db <IMAGE_NAME>` :arrow_right: `docker build -t <IMAGE_NAME> .`
  - Builds a Docker image with <IMAGE_NAME> from the source code in the current working directory.

- ### Docker Build Here

  - `dbh` :arrow_right: `docker build -t <CURRENT_DIR_NAME> .`
  - Builds a Docker image with the name of your current working directory, <CURRENT_DIR_NAME>.
  - Uses the source code of your same working directory.

- ### Docker Run Interactive

  - `dri <IMAGE_NAME> <OPTIONAL_ARGS>` :arrow_right: `docker run -it --rm <IMAGE_NAME> <OPTIONAL_ARGS>`
  - Runs a container in interactive mode based off image: <IMAGE_NAME>.
  - Will pass <OPTIONAL_ARGS> to the container.

- ### Docker Run Interactive Here

  - `drih <OPTIONAL_ARGS>` :arrow_right: `docker run -it --rm <CURRENT_DIR_NAME> <OPTIONAL_ARGS>`
  - Runs a container in interactive mode based off image with the name of the current directory <CURRENT_DIR_NAME>.
  - Will pass <OPTIONAL_ARGS> to the container.

- ### Docker Run Detached

  - `drd <IMAGE_NAME> <OPTIONAL_ARGS>` :arrow_right: `docker run -d <IMAGE_NAME> <OPTIONAL_ARGS>`
  - Runs a container in detached mode based off image: <IMAGE_NAME>.
  - Will pass <OPTIONAL_ARGS> to the container.

- ### Docker Run Detached Here

  - `drdh <OPTIONAL_ARGS>` :arrow_right: `docker run -d <CURRENT_DIR_NAME> <OPTIONAL_ARGS>`
  - Runs a container in detached mode with the name of the current directory <CURRENT_DIR_NAME>.
  - Will pass <OPTIONAL_ARGS> to the container.
