FROM ndaidong/zato:latest

ENV LANG C.UTF-8
ENV PATH /usr/local/bin:$PATH
ENV ZATO_BIN /opt/zato/*.*/bin/zato

RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    redis-server \
    ssh \
    supervisor && \

  mkdir -p /var/log/supervisor && \
  mkdir /var/run/sshd/

WORKDIR /opt/zato/

RUN touch /opt/zato/zato_user_password /opt/zato/change_zato_password && \
  uuidgen > /opt/zato/zato_user_password && \
  chown zato:zato /opt/zato/zato_user_password && \
  echo 'zato':$(cat /opt/zato/zato_user_password) > /opt/zato/change_zato_password && \
  chpasswd < /opt/zato/change_zato_password

USER zato

EXPOSE 22 6379 8183 17010 17011 11223

WORKDIR /opt/zato/

RUN wget -P /opt/zato -i https://raw.githubusercontent.com/zatosource/zato-build/master/docker/quickstart/filelist && \
  chmod 755 /opt/zato/zato_start_load_balancer \
              /opt/zato/zato_start_server1 \
              /opt/zato/zato_start_server2 \
              /opt/zato/zato_start_web_admin && \

  touch /opt/zato/web_admin_password && \
  uuidgen > /opt/zato/web_admin_password && \
  echo 'password'=$(cat /opt/zato/web_admin_password) >> /opt/zato/update_password.config && \

  mkdir -p /opt/zato/env/qs-1 && \
  rm -rf /opt/zato/env/qs-1 && mkdir -p /opt/zato/env/qs-1

WORKDIR /opt/zato/env/qs-1

RUN $ZATO_BIN quickstart create . sqlite localhost 6379 --verbose --kvdb_password "" && \
  $ZATO_BIN from-config /opt/zato/update_password.config && \
  sed -i 's/127.0.0.1:11223/0.0.0.0:11223/g' /opt/zato/env/qs-1/load-balancer/config/repo/zato.config && \
  sed -i 's/gunicorn_workers=2/gunicorn_workers=1/g' /opt/zato/env/qs-1/server1/config/repo/server.conf && \
  sed -i 's/gunicorn_workers=2/gunicorn_workers=1/g' /opt/zato/env/qs-1/server2/config/repo/server.conf

USER root

RUN rm -rf /var/lib/apt/lists/*

CMD /usr/bin/supervisord -c /opt/zato/supervisord.conf
