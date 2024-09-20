const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

mongoose.connect(`${process.env.DATABASE_URL}`)
.then((data) => console.log('connected_db - ok'))
.catch((err) => {
    console.log(err)
    console.log('connected_db -err')
});

const verifyPassword = (user, password) => {
  return user.password === password;
};

passport.use(new LocalStrategy({usernameField: 'email'},
    async (email, password, done) => {
        await User.findOne({email: email})
        .then((user) => {
            try {
                if (!user) return done(null, false);
                if (!verifyPassword(user, password)) return done(null, false);

                return done(null, user);
            }
            catch(err) {
                return done(err);
            }
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, user); 
});

passport.deserializeUser(async (user, done) => {
  try {
      await User.findOne({email: user.email})
      .then((user) => {
          done(null, user);
      });
  }
  catch(err) {
      done(err, user);
  }
});