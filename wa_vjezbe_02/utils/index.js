import { pizze } from "../data/popis_pizza.js";

export function checkArray(array) {
  return Array.isArray(array) && array.length != 0;
}

export function same_arrays(array1, array2) {
  if (!checkArray(array1) || !checkArray(array2)) {
    return false;
  }

  if (array1.length != array2.length) {
    return false;
  }

  return array1.every((element) => array2.includes(element));
}

export function pizzaExists(id_pizza) {
  return Boolean(pizze.find((pizza) => pizza.id === id_pizza));
}
