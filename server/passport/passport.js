const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { mongoService } = require('../services/mongoService');
let jwt = require('jsonwebtoken');
const config = require('./config');

passport.use(new LocalStrategy((username, password, done) => {
  try {
    mongoService.findUser(username, row => {
      if (row === 'not found') {
        return done(null, false, { message: 'Wrong username or password'});
      }
      bcrypt.compare(password, row.password, (err, res) => {
        if (res) {
          let token = jwt.sign({ username: username },
            config.secret, { expiresIn: '24h' }); // expires in 24 hours
          // return the JWT token for the future API calls
          let user = {
            success: true,
            message: 'success',
            token: token,
            user: row,
          }
          return done(null, user);
        } else {
        return done(null, false, { message: 'Incorrect username or password'});
      }
      })
    })
  } catch (err) {
    console.log(err);
  }
}));

module.exports = passport;
