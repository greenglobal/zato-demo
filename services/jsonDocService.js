// server for running service 1

const PORT = 8185;

var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./storage/documents.json');
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    let {body} = req;
    console.log(body);
    if (!body.title || !body.id) {
      console.log('Invalid POST data');
      return res.end();
    }
  }
  return next();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Document service is running at http://localhost:${PORT}/documents`);
});
