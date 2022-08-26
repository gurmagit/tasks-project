var express = require('express');
var router = express.Router();
const { taskController } = require('../controllers/taskController');

router.post('/create', (req, res) => taskController.createTask(req, res));
router.post('/list', (req, res) => taskController.taskList(req, res));
router.post('/update', (req, res) => taskController.updateTask(req, res));
router.post('/delete', (req, res) => taskController.deleteTask(req, res));
router.post('/', (req, res) => {
  console.log('route:', req.body, req.url);
})

module.exports = router;
