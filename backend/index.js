import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import tourRoute from "./routes/tours.js"
import userRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"
import reviewRoute from "./routes/reviews.js"
import bookingRoute from './routes/bookings.js';
import wishlistRoute from './routes/wishlist.js';
import visitedRoute from './routes/visited.js';
import weatherRoute from './routes/weather.js';
import Tour from './models/Tour.js'; // Imported for the /test route

dotenv.config()
const app=express()
const port=process.env.PORT || 8000
const corsOptions = {
  origin: true, // This allows any frontend URL (like your Vercel URL) to connect to your backend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//database connection
mongoose.set("strictQuery",false);
const connect = async()=>{
    try{
        console.log("--- DEBUG LOGS START ---");
        console.log("MONGO_URI length:", process.env.MONGO_URI ? process.env.MONGO_URI.length : "UNDEFINED! You must add it to Render Environment Variables!");
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb database Connected successfully");
        console.log("--- DEBUG LOGS END ---");

    }catch(err){
      console.log("MongoDB error:", err.message);
    }
};

//middleware 
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/tours',tourRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/reviews',reviewRoute);
app.use('/api/v1/bookings',bookingRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/visited', visitedRoute);
app.use('/api/v1/weather', weatherRoute);

// STEP 5 QUICK TEST ROUTE (FINAL CHECK)
app.get("/test", async (req, res) => {
  try {
    // Attempting to query the database directly WITH POPULATE
    const data = await Tour.find().populate("reviews").limit(2);
    res.json({ 
        action: "Testing MongoDb Fetching",
        status: "SUCCESS!", 
        data: data 
    });
  } catch (err) {
    // Exposing the exact mongoose error to the browser
    res.json({ 
        action: "Testing MongoDb Fetching",
        status: "FAILED!",
        error: err.message,
        hint: process.env.MONGO_URI ? "Check MongoDB IP Atlas Whitelist" : "MONGO_URI is missing on Render!"
    });
  }
});

app.listen(port, ()=>{
    connect();
    console.log('server listening on port',port);
});