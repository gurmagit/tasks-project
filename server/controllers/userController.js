const { mongoService } = require('../services/mongoService');
var passport = require('../passport/passport');

class UserController {
  constructor() {}

  login(req, res) {
    passport.authenticate('local', (err, user, info) => {
      // console.log('user:', user, 'info:', info, 'err:', err);
      if (err) res.json(err);
      if (!user) res.json(info);
      else res.json(user);
    })(req, res);
  }

  logout(req, res) {
    res.clearCookie('authorization');
    req.logOut();
    res.json({ message: req.body });
  }

  register(req, res) {
    this.checkExist(req.body.username, (exist) => {
      if (!exist) {
        mongoService.register(req.body, (err, data) => {
          if (err) {
            res.status(403).json({ error: err })
          } else {
            res.json({ user: data });
          }
        })
      } else {
        console.log('user exists');
      }
    });
  }

  checkExist(username, callback) {
    mongoService.findUser(username, (data) => {
      if (!data) {
        callback(true);
      } else {
        callback(false);
      }
    })
  }

  findUser(req, res) {
    mongoService.findUser(req.body.username, (data, err) => {
      if (err) {
        res.status(403).json({ error: err })
      } else {
        if (data) {
          res.json({ user: 'exist' });
        } else {
          res.json({ user: '' })
        }
      }
    })
  }
}

module.exports = {
  userController: new UserController()
}