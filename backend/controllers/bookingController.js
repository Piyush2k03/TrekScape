import Booking from "../models/Bookings.js";
// Create a new booking
export const createBooking = async (req, res) => {
        const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({success:true, message:"Booking successful", data:savedBooking});
    }
        catch (err) {
        res.status(500).json({success:false, message:"Booking failed",}); 
    }
}


// Get single bookings
export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({success:true, data:book});
    }
    catch (err) {
        res.status(404).json({success:false, message:"Booking not found",}); 
    }
}

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const book = await Booking.find();
        res.status(200).json({success:true, data:book});
    }   
    catch (err) {
        res.status(500).json({success:false, message:"Internal Server Error",});
    }
}

// Delete booking
export const deleteBooking = async (req, res) => {
    const id = req.params.id;
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete booking" });
    }
}

