# docker compose
alias d-c="docker-compose"

# docker build
db() {
    if [ $# -ne 1 ]; then
        echo "Pass this command exactly one argument for the name for the docker image."
        return 2
    fi

    docker build -t $1 .
    return 0
}

# docker build here
dbh() {
    if [ $# -ne 0 ]; then
        echo "This command does not take any arguments."
        return 2
    fi

    IMAGE_NAME=$(pwd | awk -F '/' '{print $NF}')

    docker build -t $IMAGE_NAME .
    return 0
}

# docker run interactive
dri() {
    if [ $# -lt 1 ]; then
        echo "Pass this command at least one argument for the docker image name."
        return 2
    fi

    docker run -it --rm $*
    return 0
}

# docker run interactive here
drih() {
    IMAGE_NAME=$(pwd | awk -F '/' '{print $NF}')

    docker run -it --rm $* $IMAGE_NAME
    return 0
}

# docker run detached
drd() {
    if [ $# -lt 1 ]; then
        echo "Pass this command at least one argument for the docker image name."
        return 2
    fi

    docker run -d $*
    return 0
}

# docker run detached here
drdh() {
    IMAGE_NAME=$(pwd | awk -F '/' '{print $NF}')

    docker run -d $* $IMAGE_NAME
    return 0
}