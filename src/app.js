const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
app.get("/mario", async (req, res) => {
  try {
    const allChars = await marioModel.find();
    res.status(200).json(allChars);
  } catch (err) {}
});

app.get("/mario/:id", async (req, res) => {
  try {
    const mario = await marioModel.find({ id: req.params.id });
    res.status(200).json(mario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/mario", async (req, res) => {
  try {
    let name = req.body.name;
    let weight = req.body.weight;
    if (!name || !weight) {
      res.status(400).json({ message: "either name or weight is missing" });
    } else {
      const newChar = new marioModel(req.body);
      const savedMario = await newChar.save();
      res.status(200).json(savedMario);
    }
  } catch (err) {}
});

app.patch("/mario/:id", async (req, res) => {
  try {
    const mario = await marioModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(mario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/mario/:id", async (req, res) => {
  try {
    const mario = await marioModel.find({ id: req.params.id });
    await mario.delete();
    res.status(200).json({ message: "character deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
