const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todosSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'users'},
  task: {type: String, required: true},
  status: {type: String, required: true, default:'todo'},
  completed: {type: Boolean, default: false},
  favorite: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now()},
  group: String
});

module.exports = mongoose.model("todos", todosSchema);