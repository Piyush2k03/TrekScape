import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './models/Tour.js';
import Review from './models/Review.js';

dotenv.config();

const runTest = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("Fetching treks WITH POPULATE...");
    const tours = await Tour.find({}).populate("reviews").limit(1);
    
    console.log("SUCCESSFULLY FETCHED AND POPULATED!");
    console.log(tours[0].reviews);
  } catch (err) {
    console.error("FAIL WITH POPULATE:", err);
  } finally {
    await mongoose.disconnect();
  }
};

runTest();
