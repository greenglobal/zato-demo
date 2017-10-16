// server for running service 2

const PORT = 8186;

var {
  readFileSync
} = require('fs');

var server = require('http')
  .createServer((req, res) => {
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
  console.log(`XML Document service is running at http://localhost:${PORT}/documents`);
});
