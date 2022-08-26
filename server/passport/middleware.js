let jwt = require('jsonwebtoken');
const config = require('./config.js');
const { loginService } = require('../services/loginService');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

let checkIfActive = (req, res, next) => {
  loginService.checkActive(req.body.username, (data) => {
    if (data === 'err' || data === 'not found') {
      return res.json({'response':'username not found'});
    } else {
      let active = data.active;
      if(active) {
        next();
      } else {
        return res.json({'response':'not active'});
      }
    }
  });
};

module.exports = {
  checkToken: checkToken,
  checkIfActive: checkIfActive,
};