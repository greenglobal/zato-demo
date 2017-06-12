# zato-demo
Sample ESB with Zato

### Guide

#### 1, Get started with docker-compose:

```
git clone https://github.com/greenglobal/zato-demo.git
cd zato-demo
docker-compose up
```

From another CLI tab, ping a test:

```
curl localhost:11223/zato/ping ; echo
```

If everything is OK, we've got:


 - Zeto dashboard: http://localhost:8183
 - JSON Document Service: http://localhost:8185/documents
 - XML Document Service: http://localhost:8186/documents


#### 2, Get IP address and admin passwords:

```
# print ip info
docker exec cluster1 ifconfig

# print 2 passwords
docker exec cluster1 cat /opt/zato/web_admin_password /opt/zato/zato_user_password
```


#### 3, Login web admin

  - Go to http://localhost:8183
  - Login with username "admin" and the above password


#### 4, Test documents services

After adding the services in /service1 & service2:


```
$ curl localhost:11223/tutorial/first-service -d '{"cust_id":123, "cust_type":"A"}'
$ curl localhost:11223/documents -X POST -d '<request><id>11</id><subject>Hello world</subject><body>Here is the body</body><by>Xooner</by><time>1106058601</time></request>'
...
```
