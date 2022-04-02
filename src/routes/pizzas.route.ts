import express from "express";
import { addPizza, deletePizza, getPizza, updatePizza } from "../controller/pizzas.controller";

const router = express.Router();

router.get("/:id", getPizza);
router.post("/", addPizza);
router.put("/:id", updatePizza);
router.delete("/:id", deletePizza);

module.exports = router;
