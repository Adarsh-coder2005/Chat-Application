const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join('D:\\projects\\bonnet\\client')));

const users = {};

io.sockets.on('connection', socket => {
    console.log('Connected');
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message => {
        console.log('From client: ' + message);
        socket.broadcast.emit('chat', {message: message, name: users[socket.id]});
    })
});

http.listen(3000, function() {
    console.log('Connected to server');
})