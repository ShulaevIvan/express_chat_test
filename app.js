const path = require('path');
const env = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./passport/passport-config');
const cors = require('cors');
// const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io');
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.AUTH_SECRET || 'test',
  cookie: {
      path: '/',
      expires: true,
      maxAge: 10000,
      secure: false,
      httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/', authRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

server.listen(PORT);
console.log(`server started at: \n ${HOST}:${PORT}`);