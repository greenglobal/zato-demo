FROM ubuntu:14.04

ENV LANG C.UTF-8

RUN apt-get update --fix-missing && apt upgrade -y && \
  apt-get install --no-install-recommends -y \
    apt-transport-https \
    python-software-properties \
    software-properties-common \
    curl && \

  curl -s https://zato.io/repo/zato-0CBD7F72.pgp.asc | apt-key add - && \
  apt-add-repository https://zato.io/repo/stable/2.0/ubuntu && \
  apt update && apt-get install -y zato && \

  cd /home && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /home
