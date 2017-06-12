// server for running service 1

var env = process.env || {}; // eslint-disable-line no-process-env

var {
  writeFileSync,
  existsSync
} = require('fs');

var exec = require('child_process').execSync;

var Chance = require('chance');
var chance = new Chance();

const PORT = env.PORT || 8185;
const STORE_DIR = './storage';

if (!existsSync(STORE_DIR)) {
  exec(`mkdir ${STORE_DIR}`);
}

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

var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./storage/documents.json');
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
  console.log(`JSON Server is running at ${PORT}`);
  console.log(`JSON Documents http://localhost:${PORT}/documents`);
});
