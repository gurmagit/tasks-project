const mongoose = require('mongoose');;
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://matan:t1mbuktu@mycluster.bauj70d.mongodb.net/fibernet?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('mongo connected');
  }).catch(err => {
    console.log("DB connection Error", err.message);
  });

class MongoService {
  constructor() {
    this.tasksSchema = new mongoose.Schema({
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      date: { type: Date, immutable: true, default: () => Date.now() }
    });

    this.usersSchema = new mongoose.Schema({
      username: { type: String, required: true },
      password: { type: String, required: true }
    });
    this.Tasks = mongoose.model('tasks', this.tasksSchema);
    this.Users = mongoose.model('users', this.usersSchema);
  }

  async findUser(username, cb) {
    const user = await this.Users.find({ username: username });
    if (user.length > 0) {
      cb(user[0]);
    } else {
      cb('not found');
    }
  }

  async register(user, cb) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err)
        return res.json({ error: true });
      const finalUser = new this.Users({
        'username': user.username,
        'password': hash,
      });
      finalUser.save()
        .then(usr => {
          console.log('usr:', usr);
          cb(null, usr);
        })
        .catch((err) => {
          cb(err, null)
        });
    });
  }

  createTask(data) {
    this.Tasks.create(data);
  }

  updateTask(data) {
    this.Tasks.findByIdAndUpdate(data.id, {content: data.content});
  }

  deleteTask(data) {
    this.Tasks.findByIdAndDelete(data.id, r => {
      console.log('r:', r);
    });
  }

  taskList(author, cb) {
    this.Tasks.find(author, (err, tasks) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, tasks);
      }
    });
  }
}

module.exports = {
  mongoService: new MongoService()
}
