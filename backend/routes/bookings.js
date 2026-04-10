import express from 'express';
import { verifyUser, verifyAdmin } from '../utils/verifyTokens.js';
import { createBooking, getAllBookings, getBooking, deleteBooking, getUserBookings } from '../controllers/bookingController.js';
const router = express.Router();
router.post('/',verifyUser,createBooking)
router.get('/user', verifyUser, getUserBookings)
router.get('/:id',verifyUser,getBooking)
router.get('/',verifyUser,getAllBookings)
router.delete('/:id', verifyAdmin, deleteBooking)

// 🧩 Test route to confirm token is received
router.get('/check', verifyUser, (req, res) => {
  res.json({
    success: true,
    message: 'Token verified successfully!',
    user: req.user
  });
});
export default router;

