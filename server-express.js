var fs = require('fs');
var privateKey  = fs.readFileSync('/root/ssl.key', 'utf8');
var certificate = fs.readFileSync('/root/ssl.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

//... bunch of other express stuff here ...
var https = require('https');
//pass in your express app and credentials to create an https server
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8082);

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    server: httpsServer
  });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('message received');
  });

  ws.send('connection established');
});