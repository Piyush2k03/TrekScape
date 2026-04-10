import express from "express";
import { getVisited, toggleVisited } from "../controllers/visitedController.js";
import { verifyUser } from "../utils/verifyTokens.js";

const router = express.Router();

router.get("/", verifyUser, getVisited);
router.post("/:tourId", verifyUser, toggleVisited);

export default router;
