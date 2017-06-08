# zato-demo
Sample ESB with Zato

### Guide

1, Pull docker images:

```
docker pull ndaidong/zato
docker pull ndaidong/zato:v2.0.7
docker pull ndaidong/nodeserver
```

2, Start Zato cluster:

```
docker run --name cluster1 -it -p 22 p 6379:6379 -p 8183:8183 -p 17010:17010 -p 17011:17011 -p 11223:11223 ndaidong/zato:v2.0.7
```


3, Get IP address and admin passwords:

```
# print ip info
docker exec cluster1 ifconfig

# print 2 passwords
docker exec cluster1 cat /opt/zato/web_admin_password /opt/zato/zato_user_password
```


4, Login web admin

  - Go to http://localhost:8183
  - Login with username "admin" and the above password


5, Run sample services

```
git clone https://github.com/greenglobal/zato-demo.git
cd zato-demo
docker run --name services -it -p 8185:8185 -v .:/home ndaidong/nodeserver
$ npm install
$ npm start
```


6, Run sample client

```
docker run --name client1 -it ndaidong/zato
curl 172.17.0.2:11223/zato/ping ; echo
```

After adding the services in /service1 & service2:

```
curl 172.17.0.2:11223/tutorial/first-service -d '{"cust_id":123, "cust_type":"A"}'
curl 172.17.0.2:11223/documents -X POST -d '<request><id>11</id><subject>Hello world</subject><body>Here is the body</body><by>Xooner</by><time>1106058601</time></request>'
...
```
