const mongoose = require("mongoose");

// Replace with the URL of your own database. Do not store the password on GitLab!
const url =
  "mongodb+srv://mongodbuser:tADmrr4f2NC2j0uo@cluster0.9rpwt.mongodb.net/myFirstDatabase";

mongoose.connect(url);

const Yhteystieto = mongoose.model("Yhteystieto", {
  name: String,
  number: Number,
});

const yhteystieto = new Yhteystieto({
  name: process.argv[2],
  number: process.argv[3],
});

if (process.argv[2] !== undefined || process.argv[3] !== undefined) {
  yhteystieto.save().then((response) => {
    console.log(
      "Nimi:",
      process.argv[2],
      "numerolla",
      process.argv[3],
      "lisattiin onnistuneesti"
    );
    mongoose.connection.close();
  });
} else {
  console.log("Yhteystiedot:");
  Yhteystieto.find({}).then((result) => {
    result.forEach((yht) => {
      console.log("Nimi", yht.name, "Numero:", yht.number);
    });
    mongoose.connection.close();
  });
}
