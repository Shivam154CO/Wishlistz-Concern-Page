import mongo from "mongoose";

const complaintSchema = new mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  orderId: { type: Number },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  ticketId: { type: String, required: true },
  status: { type: String, default: "submitted" },
});

const complaint = mongo.model("complaint", complaintSchema);

export default complaint;
