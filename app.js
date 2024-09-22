const path = require('path');
const env = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
module.exports = io = new Server(server);
const socket = require('./socket/socket');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const passport = require('passport');
const strategy = require('./passport/passport-config');
const sessionStore = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'userSessions'
});
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
      maxAge: 60 * 60 * 1000,
      secure: false,
      httpOnly: true
  },
  resave:true,
  saveUninitialized:true,
  store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api/', apiRouter);

server.listen(PORT);
console.log(`server started at: \n ${HOST}:${PORT}`);