import Wishlist from "../models/Wishlist.js";

// toggle wishlist (add or remove)
export const toggleWishlist = async (req, res) => {
  const tourId = req.params.tourId;
  const userId = req.user.id;

  try {
    // Check if it already exists
    const existingWishlist = await Wishlist.findOne({ userId, tourId });

    if (existingWishlist) {
      // Remove it
      await Wishlist.findByIdAndDelete(existingWishlist._id);
      return res.status(200).json({ success: true, message: "Removed from wishlist", action: "removed" });
    } else {
      // Add it
      const newWishlist = new Wishlist({ userId, tourId });
      await newWishlist.save();
      return res.status(200).json({ success: true, message: "Added to wishlist", action: "added" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to toggle wishlist" });
  }
};

// get all wishlist items for a user
export const getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    // Populate the tour details so the frontend can display them directly
    const wishlist = await Wishlist.find({ userId }).populate("tourId");
    
    res.status(200).json({
      success: true,
      message: "Successfully retrieved wishlist",
      data: wishlist,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch wishlist" });
  }
};
