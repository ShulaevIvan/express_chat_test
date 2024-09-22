const io = require('../app');
const User = require('../models/User');

io.on('connect', async (socket) => {
    const { id } = socket;
    const userId = socket.handshake.query.userId;

    await User.updateOne({_id: userId}, {connected: true, chatId: id});
    console.log(`a user connected ${id}`);
    setTimeout(() => {
      socket.on('test', (test) => {
        socket.emit('test', {'test': 't'});
      })
    }, 5000)
   
    socket.on('message-to-all', (msg) => {
      msg.type = 'all';
      socket.broadcast.emit('message-to-all', msg);
      socket.emit('message-to-all', msg);
    });
    


    await User.find({connected: true})
    .then((data) => {
      socket.broadcast.emit('connection', data);
    })
    

});

