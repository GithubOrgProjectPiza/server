import { Router } from "express";
import { register } from "../controller/auth.controller";
import { getAuthenthication } from "../middleware/auth.middle";

const router = Router();

router.post("/register", getAuthenthication, register);

export default router;
