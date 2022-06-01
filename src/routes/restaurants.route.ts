import express from "express";
import {
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
  getRestaurant,
  updateRestaurant,
} from "../controller/restaurants.controller";
import { requireAuthentication } from "../middleware/auth.middle";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/", requireAuthentication, addRestaurant);
router.put("/:id", requireAuthentication, updateRestaurant);
router.delete("/:id", requireAuthentication, deleteRestaurant);

module.exports = router;
