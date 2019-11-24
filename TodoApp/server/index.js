const express = require("express");
const bodyParser = require("body-parser");
const Todo = require("./model/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Nodemailer = require("nodemailer");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

const options = {
  // KeepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
};

mongoose
  .connect(
    "mongodb+srv://cuba:learnFactory2@cuba-database-q1wxb.mongodb.net/test?retryWrites=true&w=majority",
    options
  )
  .then(() => console.log("connected"))
  .catch(err => console.log("failed to connect", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to our first express app");
});

app.post("/create", (req, res) => {
  const { title, description, dateCreated } = req.body;
  const newTodo = new Todo({
    title,
    description,
    dateCreated
  });
  newTodo
    .save()
    .then(response => {
      res.send(response);
    })
    .catch(err => console.log(err));
});

app.get("/blog-post", (req, res) => {
  Todo.find({}, (err, allTodo) => {
    if (err) {
      return err;
    } else {
      res.send(allTodo);
      return allTodo;
    }
  });
});

app.get("/blog-post/:id", (req, res) => {
  Todo.findById(req.params.id, (err, singleTodo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(singleTodo);
    }
  });
});

app.delete("/delete", (req, res) => {
  Todo.deleteMany({}, (err, removed) => {
    if (err) {
      return err;
    } else {
      res.send(removed);
    }
  });
});

app.delete("/delete-post/:id", (req, res) => {
  console.log(req.params);
  Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(deletedTodo);
    }
  });
});

app.post("/update-post/:id", (req, res) => {
  Todo.findOneAndUpdate(req.params.id, req.body, (err, updated) => {
    console.log(req.body, "reeee");
    if (err) {
      console.log(err);
    } else {
      res.send(updated);
    }
  });
});

const transport = Nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "steveforcha@gmail.com",
    password: "eze12345"
  }
});

app.post("/send_mail", (req, res) => {
  const { title, subject, description } = req.body;
  const mailOptions = {
    to: "ezeokecc@gmail.com",
    from: title,
    subject: subject,
    html: description,
    dateCreated: Date.now()
  };
  transport.Sendmail(mailOptions, (err, sentmail) => {
    if (err) {
      console.log(err);
    }
    console.log(sentmail);
  });
});

// const Port = process.env.PORT || 3008;
// app.listen(Port, () => {
//   console.log("app running on port", Port);
// });
app.listen(4000);
