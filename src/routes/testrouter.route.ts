import express, { Request, Response } from "express";
import { sayHello } from "../controller/testcontroller.controller";
import { addRestaurant, updateRestaurant, deleteRestaurant } from "../controller/restaurants.controller";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  response.status(200).send("Cool test stuff!");
});

router.post("/test1", sayHello);
router.post("/addtest/", addRestaurant);
router.put("/updatetest/:id", updateRestaurant);
router.delete("/deletetest/:id", deleteRestaurant);

module.exports = router;
