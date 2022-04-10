const mongoose = require("mongoose");
require("dotenv").config();

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = process.env.MONGO;

mongoose.connect(url);

let data = [];

const Yhteystieto = mongoose.model("Yhteystieto", {
  name: String,
  number: Number,
  id: Number,
});

const update = Yhteystieto.find({}).then((result) => {
  result.forEach((yht) => {
    data.push(yht);
  });
  mongoose.connection.close();
  //console.log(data);
});

const generateId = () => {
  const maxId =
    data.length > 0
      ? data
          .map((n) => n.id)
          .sort((a, b) => a - b)
          .reverse()[0]
      : 1;
  return maxId + 1;
};

const yhteystieto = new Yhteystieto({
  name: process.argv[2],
  number: process.argv[3],
  id: generateId(),
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
    update, console.log(data), mongoose.connection.close();
  });
} else {
  console.log("Yhteystiedot:");
  Yhteystieto.find({}).then((result) => {
    result.forEach((yht) => {
      console.log("Nimi", yht.name, "Numero:", yht.number, yht.id);
    });
    mongoose.connection.close();
  });
}
