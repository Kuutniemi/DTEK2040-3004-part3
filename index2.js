const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
require("dotenv").config();

const Yhteystieto = require(`./components/Yhteystiedotdb`);

//const url = process.env.MONGO;
//mongoose.connect(url);

let data = [];

const update = Yhteystieto.find({}).then((result) => {
  result.forEach((yht) => {
    data.push(yht);
  });
  //mongoose.connection.close();
  //console.log(data);
});

app.use(bodyParser.json());
const cors = require("cors");
//const Yhteystieto = require("./components/Yhteystiedotdb");
const { response } = require("express");

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const formatYht = (yht) => {
  return {
    content: yht.content,
    date: yht.date,
    //id: yht._id,
  };
};

app.get("/api/persons", (req, res) => {
  Yhteystieto.find({}).then((yht) => {
    response.json(yht.map(formatYht));
  });
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  persons = data.persons.filter((person) => person.id !== id);

  response.status(204).end();
  update;
});

app.post("/api/persons", (request, response) => {
  //mongoose.connect(url);
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "Nimi ei voi olla tyhjä" });
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "Numero ei voi olla tyhjä" });
  }

  const yhteystieto = new Yhteystieto({
    name: body.name,
    number: body.number,
  });

  yhteystieto.save().then((response) => {
    console.log(yhteystieto);
    update;
    //mongoose.connection.close();
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
