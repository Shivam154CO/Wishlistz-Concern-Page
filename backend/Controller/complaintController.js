import Complaint from "../Models/complaintModel.js";
import nodemailer from "nodemailer";

// helper: unique ticket id
const generateTicketId = () => {
  return "CMP-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};

export const createComplaint = async (req, res) => {
  try {
    const {
      name,
      email,
      orderId,
      category,
      description,
    } = req.body;

    const ticketId = generateTicketId();

    // multer images
    const image1 = req.files?.image1?.[0]?.filename || "";
    const image2 = req.files?.image2?.[0]?.filename || "";

    const complaint = new Complaint({
      name,
      email,
      orderId,
      category,
      description,
      image1,
      image2,
      ticketId,
    });

    await complaint.save();

    // mail config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Complaint Submitted Successfully",
      text: `Hello ${name},

Your complaint has been submitted successfully.

Ticket ID: ${ticketId}

Regards,
Support Team`,
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      ticketId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyComplaints = async (req, res) => {
  try {
    const { email } = req.query;

    const complaints = await Complaint.find({ email });

    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints",
    });
  }
};


export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all complaints",
    });
  }
};


export const updateComplaint = async (req, res) => {
  try {
    const { ticketId, status } = req.body;

    const complaint = await Complaint.findOneAndUpdate(
      { ticketId },
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update complaint",
    });
  }
};
