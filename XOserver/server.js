/**
 * Created by GIGa on 06.12.2017.
 */
const WebSocket =  require('ws');
const http = require('http');
const server = new WebSocket.Server({port:3000});
var historyMessages = [];

server.on('connection', ws => {
  historyMessages.forEach(msg => {
    ws.send(msg);
  })
  ws.on('message', msg => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        historyMessages.push(msg);
        client.send(msg);
      }
    });
  });
});
