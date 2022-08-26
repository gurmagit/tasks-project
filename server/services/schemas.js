const mongoose = require('mongoose');

class Schemas {
  constructor() {
    this.tasksSchema = new mongoose.Schema({
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      date: { type: Date, immutable: true, default: () => Date.now()}
    });

    this.usersSchema = new mongoose.Schema({
      name: { type: String, required: true }
    });
    mongoose.model('tasks', this.tasksSchema);
    this.Tasks = mongoose.model('tasks');
    this.Users = mongoose.model('users', this.usersSchema);
  }
}

module.exports = {
  schemas: new Schemas()
}
