const mongoose = require("mongoose");

// Replace with the URL of your own database. Do not store the password on GitLab!
const url =
  "mongodb+srv://mongodbuser:tADmrr4f2NC2j0uo@cluster0.9rpwt.mongodb.net/myFirstDatabase";

mongoose.connect(url);

const Yhteystieto = mongoose.model("Yhteystieto", {
  name: String,
  number: Number,
});

const note = new Yhteystieto({
  name: "naskki",
  number: 6624545,
});

note.save().then((response) => {
  console.log("Database saved!");
  mongoose.connection.close();
});
