
import express, { Request, Response } from "express";
import { sayHello } from "../controller/testcontroller.controller";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  response.status(200).send("Cool test stuff!");
});

router.post("/test1/:id", sayHello);

module.exports = router;
