const mongoose = require("mongoose");

const todo = new mongoose.Schema({
  service: {
    type: String
  },
  description: String
});

const Service = mongoose.model("todo", todo);

module.exports = Service;
