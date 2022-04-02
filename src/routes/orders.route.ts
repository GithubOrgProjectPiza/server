import express from "express";
import { addOrder, deleteOrder, getOrder, updateOrder } from "../controller/orders.controller";

const router = express.Router();

router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
