import mongoose from "mongoose";

const visitedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Visited", visitedSchema);
