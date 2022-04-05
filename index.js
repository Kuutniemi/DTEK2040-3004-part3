const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const yhteystiedot = require("./db.json");
const mongoose = require("mongoose");
require("dotenv").config();

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
});

app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api", (req, res) => {
  res.json(data);
});

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = data.persons.filter((person) => person.id !== id);

  response.status(204).end();
  update;
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

app.post("/api/persons", (request, response) => {
  mongoose.connect(url);
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "Nimi ei voi olla tyhjä" });
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "Numero ei voi olla tyhjä" });
  }

  /* const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }; */

  const yhteystieto = new Yhteystieto({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  yhteystieto.save().then((response) => {
    console.log(
      "Nimi:",
      process.argv[2],
      "numerolla",
      process.argv[3],
      "lisattiin onnistuneesti"
    );
    update;
    mongoose.connection.close();
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
