import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    status: { type: String, default: "New" }, // New, Contacted, Sold
  },
  { timestamps: true }
);

// MongoDB model registration fix — prevents "Cannot overwrite model" error on Vercel
const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
export default Contact;
