import express from "express";
import { pizze } from "../data/popis_pizza.js";
import { pizzaExists } from "../utils/index.js";

const router = express.Router();

let narudzbe = [
  {
    id: 1,
    narucene_pizze: [
      { id_pizza: 1, kolicina: 2, velicina: "mala" },
      { id_pizza: 4, kolicina: 1, velicina: "jumbo" },
    ],
    adresa_dostave: "Zagrebačka ulica 45, Pula",
    broj_telefona: "09895698584",
  },
];

let dozvoljene_velicine = ["mala", "srednja", "jumbo"];

router.get("/", (req, res) => {
  res.status(200).json(narudzbe);
});

router.post("/", (req, res) => {
  let nova_narudzba = req.body;

  if (!nova_narudzba) {
    return res.status(400).json({ message: "Poslali ste prazan req.body" });
  }
  let id_narudzbe = narudzbe.length > 0 ? narudzbe.at(-1)["id"] + 1 : 1;

  let narucene_pizze = nova_narudzba.narucene_pizze;

  narucene_pizze.forEach((stavka) => {
    if (!pizzaExists(stavka.id_pizza)) {
      return res
        .status(400)
        .json({ message: "Naručili ste pizzu koja ne postoji!" });
    }
    if (!dozvoljene_velicine.includes(stavka.velicina)) {
      return res
        .status(400)
        .json({ message: "Naručena veličina pizze ne postoji!" });
    }
  });

  narudzbe.push({ id: id_narudzbe, ...nova_narudzba });
  res.status(201).json(narudzbe);
});

router.delete("/:id", (req, res) => {
  res.json(narudzbe);
});

export default router;
