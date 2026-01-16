import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  getUserCount,
} from "../controllers/userController.js";

const router = express.Router();

import{ verifyAdmin,verifyUser} from "../utils/verifyTokens.js";

router.post("/", createUser);
router.put("/:id",verifyUser, updateUser);
router.delete("/:id", verifyUser,deleteUser);
router.get("/", getAllUsers);
router.get("/:id" ,verifyUser,getSingleUser);
router.get("/count",verifyAdmin, getUserCount);


export default router;
