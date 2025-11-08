import express from "express";
import { pizze } from "../data/popis_pizza.js";

const router = express.Router();

const narudzbe = [
  { id: 1, pizza: "Margerita", velicina: "jumbo", kolicina: 2 },
  { id: 2, pizza: "Capricciosa", velicina: "mala", kolicina: 1 },
  { id: 3, pizza: "Šunka sir", velicina: "srednja", kolicina: 1 },
];

router.get("/narudzbe", (req, res) => {
  res.json(narudzbe);
});

router.post("/naruci", (req, res) => {
  const narudzba = req.body;
  const kljucevi = Object.keys(narudzba);

  const name_pizza = narudzba.pizza;

  const index = pizze.findIndex((pizza) => pizza.naziv == name_pizza);

  if (index === -1) {
    return res.json({ message: "Pizza ne postoji." });
  }

  if (
    !(
      kljucevi.includes("pizza") &&
      kljucevi.includes("velicina") &&
      kljucevi.includes("kolicina")
    )
  ) {
    res.send("Niste poslali sve potrebne podatke za narudžbu!");
    return;
  }
  narudzbe.push(narudzba);
  res.send(
    `Vaša narudžba za ${narudzba.pizza} (${narudzba.velicina}) je uspješno zaprimljena!`
  );
});

export default router;
