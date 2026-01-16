import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",

    },
    userEmail: {
      type: String,
    },
    trekName:{
        type: String,
        required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
   guestSize: {
      type: Number,
      required: true,   
    },
    phone: {
      type: Number,
      required: true,   
    },
    bookAt: {
        type: Date, 
    },

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
