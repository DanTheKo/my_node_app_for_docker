const http = require('http');
const port = process.env.PORT;
const appName = process.env.APP_NAME || 'My Default App';
const version = process.env.APP_VERSION || '1.0.0';

if (!port) {
 throw new Error('PORT variable not set!');
}
const createdAt = new Date();
const server = http.createServer((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end(`Hello World, started at ${createdAt.toISOString()} App Name: ${appName} Version: ${version}`);
});
server.listen(port, () => {
 console.log(`Server running at http://localhost:${port}/`);
});