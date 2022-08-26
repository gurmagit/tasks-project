const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController');

router.get('/', (req, res) => res.render('index', { title: 'Express' }));
router.post('/login', (req, res) => userController.login(req, res));
router.post('/register', (req, res) => userController.register(req, res));
router.get('/logout', (req, res) => userController.logout(req, res));

module.exports = router;
