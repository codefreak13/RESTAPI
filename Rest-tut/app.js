const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

//middlewares
// app.use("/post", () => {
//   console.log("this is middlewares");
// });

app.use((req, res, next) => {
  req.name = "cuba";
  next();
});

const postRoutes = require("./routes/post");

app.use("/post", postRoutes);

//ROUTES
app.get("/", (req, res) => {
  res.send("We are on home.........");
  console.log(req.name);
  res.send(req.name);
});

//connect to db
mongoose.connect(
  "mongodb://localhost:27017/cuba",
  { useNewUrlParser: true },
  () => {
    console.log("connected to db");
  }
);

app.listen(5000);
