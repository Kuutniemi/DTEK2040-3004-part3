const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO;

mongoose.connect(url);

const Yhteystieto = mongoose.model("Yhteystieto", {
  name: String,
  number: Number,
});

module.exports = Yhteystieto;
