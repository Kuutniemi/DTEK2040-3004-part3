const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const yhteystiedot = require("./db.json");

app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api", (req, res) => {
  res.json(yhteystiedot);
});

app.get("/api/persons", (req, res) => {
  res.json(yhteystiedot.persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = yhteystiedot.persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = yhteystiedot.persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId =
    yhteystiedot.length > 0
      ? yhteystiedot
          .map((n) => n.id)
          .sort((a, b) => a - b)
          .reverse()[0]
      : 1;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "Nimi ei voi olla tyhjä" });
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "Numero ei voi olla tyhjä" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  writeFile(j);
  yhteystiedot = yhteystiedot.persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
