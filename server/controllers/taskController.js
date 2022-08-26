const { mongoService } = require('../services/mongoService');

class TaskController {
  constructor() {}

  createTask(req, res) {
    console.log('create:', req.body);
    mongoService.createTask(req.body);
  }

  updateTask(req, res) {
    console.log('update:', req.body);
    mongoService.updateTask(req.body);
  }

  deleteTask(req, res) {
    console.log('delete:', req.body);
    mongoService.deleteTask(req.body.id);
  }

  taskList(req, res) {
    mongoService.taskList(req.body, (err, tasks) => {
      if (err) res.status(400).json({ reason: 'Error in Database' })
      else res.json(tasks);
    });
  }
}

module.exports = {
  taskController: new TaskController()
}