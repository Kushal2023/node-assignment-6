const { Schema } = require("mongoose");
const mongoose = require("mongoose");

//  Your code goes here
const marioModel = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
});

module.exports = marioModel;
