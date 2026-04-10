import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "../models/Tour.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const tours = await Tour.find({}, "_id title address state");
    import('fs').then(fs => {
        fs.writeFileSync('treks.json', JSON.stringify(tours, null, 2));
        console.log("Written to treks.json");
        process.exit(0);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
