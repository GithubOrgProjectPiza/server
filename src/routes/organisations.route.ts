import express from "express";
import {
  getOrganizations,
  addOrganization,
  deleteOrganization,
  getOrganization,
  updateOrganization,
} from "../controller/organisations.controller";

const router = express.Router();

router.get("/", getOrganizations);
router.get("/:id", getOrganization);
router.post("/", addOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;
