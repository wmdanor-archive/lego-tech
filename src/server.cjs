try {
  require('dotenv').config();
} catch {
}
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const port = Number(process.env.PORT ?? 3000);

const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

/** @type {Record<string, string>} */
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain',
};

const server = http.createServer((request, response) => {
  const filePath = (request.url === '/' ? '/index.html' : request.url).slice(1);
  const acceptEncoding = request.headers['accept-encoding'] || '';

  const extname = path.extname(filePath).toLowerCase();

  const contentType = mimeTypes[extname] ?? 'application/octet-stream';

  function pipeStream(readStream, contentType = 'text/html') {
    if (acceptEncoding.match(/\bdeflate\b/)) {
      response.writeHead(200, { 'Content-Encoding': 'deflate', 'Content-Type': contentType });
      readStream.pipe(zlib.createDeflate()).pipe(response);
    } else if (acceptEncoding.match(/\bgzip\b/)) {
      response.writeHead(200, { 'Content-Encoding': 'gzip', 'Content-Type': contentType });
      readStream.pipe(zlib.createGzip()).pipe(response);
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      readStream.pipe(response);
    }
  }

  function respondError() {
    response.writeHead(500);
    response.end('500 Internal Server Error');
  }

  const stream = fs.createReadStream(path.resolve(distPath, filePath));

  stream.on('error', (error) => {
    if (error.code === 'ENOENT') {
      const indexStream = fs.createReadStream(indexPath);

      indexStream.on('error', respondError);

      pipeStream(indexStream);

    } else {
      respondError();
    }
  });

  pipeStream(stream, contentType);
});

server.listen(port);

console.log(`Server listening on port ${port}`);
