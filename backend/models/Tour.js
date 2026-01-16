import mongoose from "mongoose";

// Renamed schema variable to trekSchema
const trekSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Added trim for clean data
    },
    
    // Updated location structure
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    
    // Added Difficulty Level (DifLevel) and restricted values
    DifLevel: {
      type: String,
      required: true,
      enum: ['Easy', 'Moderate', 'Hard'],
    },
    
    // Added Category for filtering (e.g., Fort Trek, Jungle Trek)
    category: {
      type: String,
      required: true,
      enum: ['Fort Trek', 'Jungle Trek', 'Nature Trail', 'Regular Trek'],
    },
    
    // Removed redundant 'city' field (replaced by state/address)
    // Removed 'city' field from here
    
    photo: {
      type: String,
      required: true,
    },
    
    desc: {
      type: String,
      required: true,
    },
    
    price: {
      type: Number,
      required: true,
    },
    

    reviews: [
  {
    type: mongoose.Types.ObjectId,
    ref: "Review",
  }
]
,

    featured: {
      type: Boolean,
      default: false,
    },
    mapLink: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", trekSchema);