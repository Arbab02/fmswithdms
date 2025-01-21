import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  industry: {
    type: String,
    required: true,
    trim: true,
  },
  businessType: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  website: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  business: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  month: {
    type: String,
    required: false,
    trim: true,
  },
  year: {
    type: String,
    required: false,
    trim: true,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

export default mongoose.models.Deal || mongoose.model("Deal", dealSchema);
