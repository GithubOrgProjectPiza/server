import express from "express";
import {
  addOrganization,
  deleteOrganization,
  getOrganization,
  updateOrganization,
} from "../controller/organisations.controller";

const router = express.Router();

router.get("/:id", getOrganization);
router.post("/", addOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;
