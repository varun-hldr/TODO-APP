const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  user: {type: Schema.Types.ObjectId, ref: 'users'},
});

module.exports = mongoose.model("group", groupSchema);