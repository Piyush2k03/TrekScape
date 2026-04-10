import express from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController.js";
import { verifyUser } from "../utils/verifyTokens.js";

const router = express.Router();

router.get("/", verifyUser, getWishlist);
router.post("/:tourId", verifyUser, toggleWishlist);

export default router;
