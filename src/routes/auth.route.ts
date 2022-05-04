import { Router } from "express";
import { authenthicate, register } from "../controller/auth.controller";
import { getAuthenthication } from "../middleware/auth.middle";

const router = Router();

router.post("/register", getAuthenthication, register);
router.post("/authenthicate",authenthicate);

export default router;
