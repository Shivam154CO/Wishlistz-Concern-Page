import express from "express";
import {
  createComplaint,
  getMyComplaints,
  updateComplaint,
  getAllComplaints
} from "../Controller/complaintController.js";
import upload from "../middleware/upload.js"

const router = express.Router();

/* CLIENT PANEL */
router.post(
  "/complaint/create",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  createComplaint
);
router.get("/complaint/my", getMyComplaints);

/* ADMIN PANEL */
router.get("/complaint/all", getAllComplaints);
router.patch("/complaint/update", updateComplaint);

export default router;
