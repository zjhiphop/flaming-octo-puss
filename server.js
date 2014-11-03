var express = require('express');
var app = express();

app.use(express.bodyParser({limit: '50mb'}));
app.use(express.urlencoded() );
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

var server = app.listen(process.env.port || "8004");
var io = require('socket.io').listen(server).set('log level', 0);

console.log("HeadlessView", server.address().port);

app.post('/', function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Accept, Origin, X-Requested-With, Content-Type, Authorization');

  io.sockets.emit('img', req.body.img);

  io.sockets.emit('html', req.body.html);

  console.log(req.body);

  res.end("");
});

