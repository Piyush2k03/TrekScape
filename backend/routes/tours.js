import express from 'express';
import { 
  createTrek,
  updateTrek,
  deleteTrek, 
  getSingleTrek,
  getAllTrek,
  getTrekBySearch,
  getFeaturedTrek,
  getTrekCount,
  getMostReviewedTreks
} from '../controllers/trekController.js';

import{ verifyAdmin, verifyUser } from '../utils/verifyTokens.js';  

const router = express.Router();

// Create new trek
router.post("/",verifyAdmin, createTrek);

// Update trek
router.put("/:id",verifyAdmin, updateTrek);

// 🔍 Search trek (MUST be before /:id)
router.get("/search", getTrekBySearch);
router.get("/search/getFeaturedTours", getFeaturedTrek);
router.get("/count", getTrekCount);
router.get("/most-reviewed", getMostReviewedTreks);

// Get all treks
router.get("/", getAllTrek);

// Get single trek
router.get("/:id", getSingleTrek);

// Delete trek
router.delete("/:id",verifyAdmin,deleteTrek);

export default router;
