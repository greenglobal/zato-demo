FROM ubuntu:16.04

ENV LANG C.UTF-8

RUN apt update --fix-missing && apt upgrade -y && \
  apt install --no-install-recommends -y \
    apt-transport-https \
    python-software-properties \
    software-properties-common \
    curl && \

  curl -s https://zato.io/repo/zato-0CBD7F72.pgp.asc | apt-key add - && \
  apt-add-repository https://zato.io/repo/stable/2.0/ubuntu && \
  apt update && apt install -y zato && \

  cd /home && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /home
