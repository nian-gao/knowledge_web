const http2 = require('http2');
const fs = require('fs');

const serverHandle = require('./serverHandle');
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE
} = http2.constants;

const server = http2.createSecureServer({
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem')
  }, serverHandle);
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
    const method = headers[HTTP2_HEADER_METHOD];
    const path = headers[HTTP2_HEADER_PATH];
    // 流是一个双工流。
    stream.respond({
      [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain',
      [HTTP2_HEADER_STATUS]: 200
    });
    stream.end('hello world! 中文编码');
  });

  server.listen(8443);
  console.log('Server running at https://127.0.0.1:8443/');