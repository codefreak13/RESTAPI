const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  age: Number,
  subject: []
});

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;
