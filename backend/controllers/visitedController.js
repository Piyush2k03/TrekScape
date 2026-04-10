import Visited from "../models/Visited.js";

// Toggle visited status
export const toggleVisited = async (req, res) => {
  const tourId = req.params.tourId;
  const userId = req.user.id;

  try {
    const existingVisit = await Visited.findOne({ userId, tourId });

    if (existingVisit) {
      await Visited.findByIdAndDelete(existingVisit._id);
      return res.status(200).json({ success: true, message: "Removed from visited", action: "removed" });
    } else {
      const newVisit = new Visited({ userId, tourId });
      await newVisit.save();
      return res.status(200).json({ success: true, message: "Marked as visited", action: "added" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to toggle visited status" });
  }
};

// Get all visited treks for a user
export const getVisited = async (req, res) => {
  const userId = req.user.id;

  try {
    const visitedTreks = await Visited.find({ userId }).populate("tourId");
    
    res.status(200).json({
      success: true,
      message: "Successfully retrieved visited treks",
      data: visitedTreks,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch visited treks" });
  }
};
