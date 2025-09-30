const http = require('http');
const port = 3000;
const createdAt = new Date();
const server = http.createServer((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end(`Hello World, started at ${createdAt.toISOString()}`);
});
server.listen(port, () => {
 console.log(`Server running at http://localhost:${port}/`);
});