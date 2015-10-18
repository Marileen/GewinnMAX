var express = require('express'),
    path = require('path'),
    app = express(),
    http = require('http').Server(app),

    io = require('socket.io')(http, { serveClient: true});

    require('./websocket/service')(io);


http.listen(8050, function(){
    console.log('listening on *:3000');
});

module.exports = app;