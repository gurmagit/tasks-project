const { mongoService } = require('../services/mongoService');

class TaskController {
  constructor() {}

  createTask(req, res) {
    console.log('create:', req.body);
    mongoService.createTask(req.body, r => {
      console.log('create response:', r);
      res.json({'response': r})
    });
  }

  updateTask(req, res) {
    console.log('update:', req.body);
    mongoService.updateTask(req.body, r => {
      res.json({'response': r})
    });
  }

  deleteTask(req, res) {
    console.log('delete:', req.body);
    mongoService.deleteTask(req.body.id, r => {
      if (r) {
        res.json({'response': r})
      } else {
        res.json({'response': {deletedCount: 0}})
      }
    });
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