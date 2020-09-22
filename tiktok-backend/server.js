import express from "express";
import mongoose from "mongoose";

import Videos from "./dbModel.js";

//db config

const connection_url =
  "mongodb+srv://admin:QNrEM6D74kBJsFpm@cluster0.h3zwz.mongodb.net/tiktok?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 9000;

// middlewares

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

// api endpoints

app.get("/", (req, res) => res.status(200).send("hello world"));
app.listen(port, () => console.log(`listening on localhost: ${port}`));

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  // POST request is to ADD DATA to the database
  // it will let us ADD video DOCUMENT to the videos COLLCETION
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
