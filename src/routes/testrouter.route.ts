import express, { Request, Response } from "express";
import { sayHello } from "../controller/testcontroller.controller";
import { addOrder, updateOrder, deleteOrder } from "../controller/orders.controller";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  response.status(200).send("Cool test stuff!");
});

router.post("/test1", sayHello);
router.post("/addtest/", addOrder);
router.put("/updatetest/:id", updateOrder);
router.delete("/deletetest/:id", deleteOrder);

module.exports = router;
