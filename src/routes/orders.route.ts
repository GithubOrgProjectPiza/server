import express from "express";
import { addOrder, deleteOrder, getOrder, updateOrder, getOrders } from "../controller/orders.controller";
import { requireAuthentication } from "../middleware/auth.middle";

const router = express.Router();

router.get("/", requireAuthentication, getOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
