import express from "express";
import { sayHello } from "../controller/testcontroller.controller";

export const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  response.status(200).send("Cool test stuff!");
});

router.post("/test1", sayHello);

module.exports = router;
