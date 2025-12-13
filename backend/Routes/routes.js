import express from "express";
import {
  createComplaint,
  getMyComplaints,
  updateComplaint,
  getAllComplaints
} from "../Controller/complaintController.js";

const router = express.Router();

/* CLIENT PANEL */
router.post("/complaint/create", createComplaint);
router.get("/complaint/my", getMyComplaints);

/* ADMIN PANEL */
router.get("/complaint/all", getAllComplaints);
router.patch("/complaint/update", updateComplaint);

export default router;
