const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./model/stdSchema");

const app = express();

const URL = "mongodb://localhost:27017/bab";

mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo");
  }) 
  .catch(err => {
    console.log("error", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("my first express app");
});

app.post("/new_student", (req, res) => {
  const { name, age, subject } = req.body;

  const newStudent = new Student({
    name,
    age,
    subject
  });

  newStudent
    .save()
    .then(() => {
      console.log("saved");
    })
    .catch(err => {
      console.log("error", err);
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("running on....", port);
});
