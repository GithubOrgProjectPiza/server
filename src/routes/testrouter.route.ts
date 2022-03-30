import express, { Request, Response } from "express";
import { sayHello } from "../controller/testcontroller.controller";
import { addRestaurant } from "../controller/restaurants.controller";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  response.status(200).send("Cool test stuff!");
});

router.post("/test1", sayHello);
router.post("/test2", addRestaurant);

module.exports = router;
