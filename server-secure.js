// Source: https://github.com/einaros/ws

var ws_cfg = {
  ssl: true,
  port: 8081,
  ssl_key: '/root/ssl.key',
  ssl_cert: '/root/ssl.crt'
};

var fs = require('fs');

console.log("server has loaded");

var processRequest = function(req, resp) {
	console.log("request received");
	resp.writeHead(200);
	resp.end("Web socket request processed!")
};

var httpServ = require('https');
var app = httpServ.createServer({
	key: fs.readFileSync( ws_cfg.ssl_key ),
	cert: fs.readFileSync( ws_cfg.ssl_cert )
}, processRequest ).listen(ws_cfg.port);

var WebSocketServer = require('ws').Server, wss = new WebSocketServer( { server: app } );
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('message received');
  });

  ws.send('connection established');
});

console.log('still running');