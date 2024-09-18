const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

server.listen(PORT);
console.log(`server started at: \n ${HOST}:${PORT}`);