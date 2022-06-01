import express from "express";
import { getPizzas, addPizza, deletePizza, getPizza, updatePizza } from "../controller/pizzas.controller";
import { requireAuthentication } from "../middleware/auth.middle";

const router = express.Router();

router.get("/", getPizzas);
router.get("/:id", getPizza);
router.post("/", requireAuthentication, addPizza);
router.put("/:id", requireAuthentication, updatePizza);
router.delete("/:id", requireAuthentication, deletePizza);

module.exports = router;
