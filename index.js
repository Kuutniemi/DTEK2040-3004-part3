const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Yhteystieto = require(`./components/Yhteystiedotdb`);

const formatYht = (yht) => {
  return {
    name: yht.name,
    number: yht.number,
    id: yht._id,
  };
};

app.use(express.static("build"));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

app.get("/api/persons", (request, response) => {
  Yhteystieto.find({}, { __v: 0 }).then((notes) => {
    response.json(notes.map(formatYht));
  });
});

app.post("/api/persons", (request, response) => {
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

  yhteystieto.save().then((yht) => {
    response.json(formatYht(yht));
  });
});

app.get("/api/persons/:id", (request, response) => {
  Yhteystieto.findById(request.params.id)
    .then((yht) => {
      if (yht) {
        response.json(formatYht(yht));
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response
        .status(400)
        .send({ error: "Tapahtui virhe, konsolissa tietoja" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Yhteystieto.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      response
        .status(400)
        .send({ error: "Tapahtui virhe, konsolissa tietoja" });
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
