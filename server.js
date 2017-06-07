// server

var {
  writeFileSync
} = require('fs');

var jsonxml = require('jsontoxml');

var Chance = require('chance'),
    chance = new Chance();

const PORT = 3001;

// sample 1
let docs = [];

while (docs.length < 10) {
  let t = docs.length + 1;
  let title = chance.sentence({words: 5});
  let doc = {
    id: t,
    title: `Title ${t} - ${title}`,
    author: chance.name(),
    content: chance.paragraph(),
    sentAt: chance.timestamp(),
    sentFrom: chance.address(),
    signature: chance.guid()
  };
  docs.push(doc);
}

let data = {
  documents: docs
};

writeFileSync('./documents.json', JSON.stringify(data), 'utf8');

// sample 2
docs = [];

while (docs.length < 10) {
  let t = docs.length + 1;
  let title = chance.sentence({words: 5});
  let doc = {
    id: t,
    subject: `Title ${t} - ${title}`,
    body: chance.paragraph(),
    by: chance.name(),
    time: chance.timestamp(),
    place: chance.address(),
    domain: chance.domain(),
    postal: chance.postal()
  };
  docs.push({document: doc});
}

let rootNode = {
  root: docs
};

var xml = jsonxml(rootNode);

writeFileSync('./public/documents.xml', xml, 'utf8');

var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./documents.json');
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.body);
  }
  next();
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running at ${PORT}`)
});
