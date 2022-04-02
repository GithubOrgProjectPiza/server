import express from "express";
import { addRestaurant, deleteRestaurant, getRestaurant, updateRestaurant } from "../controller/restaurants.controller";

const router = express.Router();

router.get("/:id", getRestaurant);
router.post("/", addRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;
