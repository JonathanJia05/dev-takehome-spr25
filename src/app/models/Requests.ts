// models/Request.ts

import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Request interface
export interface IRequest extends Document {
  requestorName: string;
  itemRequested: string;
  createdDate: Date;
  lastEditedDate?: Date;
  status: "pending" | "completed" | "approved" | "rejected";
}

// Create the schema
const RequestSchema: Schema<IRequest> = new Schema(
  {
    requestorName: {
      type: String,
      required: [true, "Requestor Name is required"],
      minlength: [3, "Requestor Name must be at least 3 characters long"],
      maxlength: [30, "Requestor Name cannot exceed 30 characters"],
      trim: true,
    },
    itemRequested: {
      type: String,
      required: [true, "Item Requested is required"],
      minlength: [2, "Item Requested must be at least 2 characters long"],
      maxlength: [100, "Item Requested cannot exceed 100 characters"],
      trim: true,
    },
    createdDate: {
      type: Date,
      required: [true, "Created Date is required"],
      default: Date.now,
    },
    lastEditedDate: {
      type: Date,
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["pending", "completed", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: false, // We handle createdDate and lastEditedDate explicitly
  }
);

// Export the model
const Request: Model<IRequest> =
  mongoose.models.Request || mongoose.model<IRequest>("Request", RequestSchema);
export default Request;
