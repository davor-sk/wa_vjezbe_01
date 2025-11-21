import express from "express";
import { pizze } from "../data/popis_pizza.js";
const router = express.Router();

import { checkArray, same_arrays } from "../utils/index.js";
let dozvoljeni_kljucevi = ["naziv", "cijena"];

router.get("/", (req, res) => {
  if (!checkArray(pizze)) {
    return res.status(500).json({ message: "Podacima se ne može pristupiti!" });
  }
  return res.status(200).json(pizze);
});

router.get("/:naziv", (req, res) => {
  if (!checkArray(pizze)) {
    return res.status(500).json({ message: "Podacima se ne može pristupiti!" });
  }

  const naziv_pizze = req.params.naziv;

  if (!isNaN(naziv_pizze)) {
    return res.status(400).json({
      message: "Proslijedili ste neispravan podatak!",
    });
  }

  const pizza = pizze.find((pizza) => pizza.naziv == naziv_pizze);

  if (pizza) {
    return res.status(200).json(pizza);
  }

  return res
    .status(404)
    .json({ message: "Pizza s traženim nazivom ne postoji." });
});

router.post("/", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "HTTP body je prazan." });
  }

  let pizze_dodavanje = req.body;
  let kljucevi_pizze = Object.keys(pizze_dodavanje);

  if (!same_arrays(dozvoljeni_kljucevi, kljucevi_pizze)) {
    return res.status(400).json({ message: "Ključevi se ne podudaraju." });
  }

  let postojeca = pizze.find((pizza) => pizza.naziv == pizze_dodavanje.naziv);

  if (postojeca) {
    return res.status(400).json({
      greska: `Pizza s nazivom ${pizze_dodavanje.naziv} već postoji`,
    });
  }

  const novi_id = pizze.at(-1)["id"] + 1;

  pizze.push({ id: novi_id, ...pizze_dodavanje });
  return res.status(201).json(pizze);
});

router.put("/:naziv", (req, res) => {
  const naziv_pizze_zamjena = req.params.naziv;

  if (!isNaN(naziv_pizze_zamjena)) {
    return res.status(400).json({
      message: "Proslijedili ste neispravan podatak!",
    });
  }

  const nova_pizza = req.body;
  let nova_pizza_kljucevi = Object.keys(nova_pizza);
  let nova_pizza_cijena = req.body.cijena;

  if (nova_pizza_cijena <= 0) {
    return res
      .status(400)
      .json({ message: "Cijena ne smije biti manja ili jednaka 0" });
  }

  if (!nova_pizza) {
    return res.status(400).json({
      message: "Proslijedili ste neispravan podatak!",
    });
  }

  const pizza_zamjena = pizze.find(
    (pizza) => pizza.naziv == naziv_pizze_zamjena
  );

  if (!pizza_zamjena) {
    return res
      .status(404)
      .json({ message: `Pizza s nazivom ${naziv_pizze_zamjena} ne postoji!` });
  }

  if (!same_arrays(dozvoljeni_kljucevi, nova_pizza_kljucevi)) {
    return res.status(400).json({ message: "Ključevi se ne podudaraju." });
  }

  let postojeci_id = pizza_zamjena.id;
  let pizza_zamjena_index = pizze.indexOf(pizza_zamjena);

  pizze.splice(pizza_zamjena_index, 1, { id: postojeci_id, ...nova_pizza });
  return res.json(pizze);
});

router.patch("/:id", (req, res) => {
  const pizza_za_patch_id = req.params.id;

  if (isNaN(pizza_za_patch_id)) {
    return res.status(400).json({ message: "Indeks mora biti broj" });
  }

  if (!req.body) {
    return res.status(400).json({ message: "HTTP body je prazan." });
  }

  let patch_podaci = req.body;
  let patch_podaci_kljucevi = Object.keys(patch_podaci);

  if (
    !patch_podaci_kljucevi.every((element) =>
      dozvoljeni_kljucevi.includes(element)
    )
  ) {
    return res
      .status(404)
      .json({ message: "Poslali ste neispravne ključeve za ažuriranje" });
  }

  const index = pizze.findIndex((pizza) => pizza.id == pizza_za_patch_id);
  if (index == -1) {
    res.status(404).json({ message: "Pizza s traženim ID-em ne postoji." });
  }

  let pizza_patch = pizze[index];

  Object.assign(pizza_patch, patch_podaci);

  return res.status(200).json(pizze);
});

router.delete("/:naziv", (req, res) => {
  let naziv_brisanje = req.params.naziv;

  if (!isNaN(naziv_brisanje)) {
    return res.status(400).json({
      message: "Proslijedili ste neispravan podatak!",
    });
  }

  let index = pizze.findIndex((pizza) => pizza.naziv == naziv_brisanje);
  if (index !== -1) {
    pizze.splice(index, 1);
    return res.status(204).json({ pizze });
  } else {
    return res
      .status(404)
      .json({ message: "Pizza s traženim nazivom ne postoji." });
  }
});

export default router;
