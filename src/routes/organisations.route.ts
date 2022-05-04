import express from "express";
import {
  getOrganizations,
  addOrganization,
  deleteOrganization,
  getOrganization,
  updateOrganization,
} from "../controller/organisations.controller";
import { requireAuthentication } from "../middleware/auth.middle";

const router = express.Router();

router.get("/", requireAuthentication, getOrganizations);
router.get("/:id", getOrganization);
router.post("/", requireAuthentication, addOrganization);
router.put("/:id", requireAuthentication, updateOrganization);
router.delete("/:id", requireAuthentication, deleteOrganization);

module.exports = router;
