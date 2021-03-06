const WebSocket =  require('ws');
const http = require('http');
const url = require('url');
const server = new WebSocket.Server({port:8080});
var historyMessages = [];
server.on("connection", function (ws, req) {
  var path = url.parse(req.url, true).pathname;
  ws.send(path);
  historyMessages.forEach(msg => {
    ws.send(msg);
  });
  ws.on('message', msg => {
    server.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(msg);
      }
    });
    historyMessages.push(msg);
  });
})
// const express = require('express');
// const http = require('http');
// const url = require('url');
// const WebSocket = require('ws');
//
// const app = express();
//
// app.use(function (req, res) {
//   res.send({ msg: "hello" });
// });
//
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
//
// wss.on('connection', function connection(ws, req) {
//   const location = url.parse(req.url, true).pathname;
//   console.log(location);
//   // You might use location.query.access_token to authenticate or share sessions
//   // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
//
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });
//
//   ws.send('something');
// });
//
// server.listen(8080, function listening() {
//   console.log('Listening on %d', server.address().port);
// });
