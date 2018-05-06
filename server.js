const express = require('express'),
    http = require('http'),
    socketIo = require('socket.io'),
    app = express();
    server = http.createServer(app),
    io = socketIo(server),
    UserService = require('./UsersService'),
    userService = new UserService(),
    port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket)=> {
    socket.on('message', (message)=> {
        const {name} = userService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name
        });
    });
socket.on('disconnect', ()=> {
    userService.removeUser(socket.id);
    socket.broadcast.emit('update', {
        users: userService.getAllusers()
    });
});
    //client is listening for entry info
socket.on('join', (name)=>{
    //new user is saved with list of contacts
    userService.addUser({
        id: socket.id,
        name
    });
    io.emit('update', {
        users: userService.getAllusers()
    });
});
});
server.listen(port,() => {
    console.log('listening on *:'+ port);
});