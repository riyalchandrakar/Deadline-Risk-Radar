import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    estimatedHours: { type: Number, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    riskLevel: {
      type: String,
      enum: ["safe", "at_risk", "likely_late"],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
