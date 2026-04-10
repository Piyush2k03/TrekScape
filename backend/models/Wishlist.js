import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
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

export default mongoose.model("Wishlist", wishlistSchema);
