// server for running service 3

const PORT = 8187;

var server = require('http')
  .createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/vblt') {
      let body = [];
      req.on('error', (err) => {
        console.error(err);
      }).on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(body);
        res.end();
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.write('<status>ok</status>');
      res.end();
    }
  });

server.listen(PORT, () => {
  console.log(`LTVB Deliver service is running at http://localhost:${PORT}/vblt`);
});
