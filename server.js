// server

var {
  readFileSync,
  writeFileSync,
  existsSync
} = require('fs');

var exec = require('child_process').execSync;

var jsonxml = require('jsontoxml');

var Chance = require('chance'),
    chance = new Chance();

const PORT = 8185;
const STORE_DIR = './storage';

if (!existsSync(STORE_DIR)) {
  exec(`mkdir ${STORE_DIR}`);
}

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

writeFileSync('./storage/documents.json', JSON.stringify(data), 'utf8');

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

writeFileSync('./storage/documents.xml', xml, 'utf8');

var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./storage/documents.json');
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/xml/documents', (req, res) => {
  let xml = readFileSync('./storage/documents.xml');
  return res.type('text/xml').send(xml);
});

server.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.body);
  }
  next();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running at ${PORT}`);
  console.log(`JSON Documents http://localhost:${PORT}/documents`);
  console.log(`XML Documents http://localhost:${PORT}/xml/documents`);
});
