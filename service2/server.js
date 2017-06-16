// server for running service 2

var env = process.env || {}; // eslint-disable-line no-process-env

var {
  readFileSync,
  writeFileSync,
  existsSync
} = require('fs');

var exec = require('child_process').execSync;

var jsonxml = require('jsontoxml');

var Chance = require('chance');
var chance = new Chance();

const PORT = env.PORT || 8186;
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

var server = require('http')
  .createServer((req, res) => {
    res.writeHeader(200, {
      'Content-Type': 'text/plain'
    });
    res.writeHead(200, {'Content-Type': 'text/xml'});
    if (req.method === 'GET' && req.url === '/documents') {
      let s = readFileSync('./storage/documents.xml', 'utf8');
      res.write(s);
    } else {
      res.write('<status>1</status>');
    }
    res.end();
  });

server.listen(PORT, () => {
  console.log(`JSON Server is running at ${PORT}`);
  console.log(`XML Documents http://localhost:${PORT}/documents`);
});
