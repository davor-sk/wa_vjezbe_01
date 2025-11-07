const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

const pizze = [
  { id: 1, naziv: "Margherita", cijena: 6.5 },
  { id: 2, naziv: "Capricciosa", cijena: 8.0 },
  { id: 3, naziv: "Quattro formaggi", cijena: 10.0 },
  { id: 4, naziv: "Šunka sir", cijena: 7.0 },
  { id: 5, naziv: "Vegetariana", cijena: 9.0 },
];

app.get("/", (req, res) => {
  res.send("Hello, Worlddd!");
});

app.get("/pizze", (req, res) => {
  res.json(pizze);
});

app.get("/pizze/:id", (req, res) => {
  const id_pizza = req.params.id;

  if (isNaN(id_pizza)) {
    res.json({ message: "Proslijedili ste parametar id koji nije broj!" });
  }

  const pizza = pizze.find((pizza) => pizza.id == id_pizza);

  if (pizza) {
    res.json(pizza);
  } else {
    res.json({ message: "Pizza s traženim ID-em ne postoji." });
  }
});

app.post("/naruci", (req, res) => {
  const narudzba = req.body;
  const kljucevi = Object.keys(narudzba);

  if (!(kljucevi.includes("pizza") && kljucevi.includes("velicina"))) {
    res.send("Niste poslali sve potrebne podatke za narudžbu!");
    return;
  }
  res.send(
    `Vaša narudžba za ${narudzba.pizza} (${narudzba.velicina}) je uspješno zaprimljena!`
  );
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
