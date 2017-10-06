var {
  writeFileSync,
  existsSync
} = require('fs');

var exec = require('child_process').execSync;

var jsonxml = require('jsontoxml');

var Chance = require('chance');
var chance = new Chance();

const STORE_DIR = './storage';

if (!existsSync(STORE_DIR)) {
  exec(`mkdir ${STORE_DIR}`);
}

let jsonDocs = [];

while (jsonDocs.length < 10) {
  let t = jsonDocs.length + 1;
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
  jsonDocs.push(doc);
}

let json = {
  documents: jsonDocs
};

writeFileSync('./storage/documents.json', JSON.stringify(json), 'utf8');


let xmlDocs = [];

while (xmlDocs.length < 10) {
  let t = xmlDocs.length + 1;
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
  xmlDocs.push({document: doc});
}

let rootNode = {
  root: xmlDocs
};

let xml = jsonxml(rootNode);

writeFileSync('./storage/documents.xml', xml, 'utf8');
