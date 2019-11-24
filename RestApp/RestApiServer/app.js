const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Service = require("./Schema");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
// app.get("/Todo", (req, res) => {
//   res.send("message received");
// });

app.post("/todo/add", (req, res) => {
  // console.log("hi");
  const { service, description } = req.body;
  const newService = new Service({
    service,
    description
  });
  newService
    .save()
    .then(res => res.json(newService))
    .catch(err => res.status(400).json(err));
});

app.get("/todo/get", (req, res) => {
  Service.find({})
    .then(service => res.json(service))
    .catch(err => res.status(400).json(err));
});

options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose
  .connect(
    "mongodb+srv://cuba:learnFactory2@cuba-database-q1wxb.mongodb.net/test?retryWrites=true&w=majority",
    options
  )
  .then(() => console.log("connected to Database"))
  .catch(err => console.log(err));

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("connected to Database");
// });

app.listen(5000, () => console.log(`server is running on port 5000`));
