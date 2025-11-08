import express from "express";
import { pizze } from "../data/popis_pizza.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json(pizze);
});

router.get("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const id_pizza = req.params.id;
  const nova_pizza = req.body;

  nova_pizza.id = id_pizza;
  const index = pizze.findIndex((pizza) => pizza.id == id_pizza);
  if (index !== -1) {
    pizze[index] = nova_pizza;
    res.json(pizze[index]);
  } else {
    res.json({ message: "Pizza s traženim ID-em ne postoji." });
  }
});

router.patch("/:id", (req, res) => {
  const id_pizza = req.params.id;
  const nova_pizza = req.body;
  const index = pizze.findIndex((pizza) => pizza.id == id_pizza);
  if (index !== -1) {
    for (const key in nova_pizza) {
      pizze[index][key] = nova_pizza[key];
    }
    res.json(pizze[index]);
  } else {
    res.json({ message: "Pizza s traženim ID-em ne postoji." });
  }
});

router.delete("/:id", (req, res) => {
  const id_pizza = req.params.id;
  const index = pizze.findIndex((pizza) => pizza.id == id_pizza);
  if (index !== -1) {
    pizze.splice(index, 1);
    res.json({ message: "Pizza uspješno obrisana." });
  } else {
    res.json({ message: "Pizza s traženim ID-em ne postoji." });
  }
});

export default router;
