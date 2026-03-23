import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "../models/Tour.js";

dotenv.config();

const treks = [
  {
    title: "Kumara Parvatha Trek",
    state: "Karnataka",
    address: "Pushpagiri Wildlife Sanctuary",
    DifLevel: "Hard",
    price: 3500,
    photo: "../images/tour-img01.jpg",
    category: "Regular Trek",
    desc: "The toughest and most famous trek in Karnataka, pushing your limits across thick jungles to the second-highest peak in Kodagu.",
    featured: true,
    mapLink: "https://maps.app.goo.gl/95aofv2x99H22Y1WA"
  },
  {
    title: "Kudremukh Trek",
    state: "Karnataka",
    address: "Chikmagalur",
    DifLevel: "Moderate",
    price: 2800,
    photo: "../images/tour-img02.jpg",
    category: "Regular Trek",
    desc: "A gorgeous trek through the rolling green hills of the Western Ghats to a horse-face-shaped peak.",
    featured: true,
    mapLink: "https://maps.app.goo.gl/6D1U9VvGjF15dFmVA"
  },
  {
    title: "Mullayanagiri Trek",
    state: "Karnataka",
    address: "Chikmagalur",
    DifLevel: "Easy",
    price: 1500,
    photo: "../images/tour-img03.jpg",
    category: "Regular Trek",
    desc: "An easy and popular hike to the highest peak in Karnataka, offering misty, sweeping views of the Western Ghats.",
    featured: true,
    mapLink: "https://maps.app.goo.gl/uX3L5V53V1G4yD2L8"
  },
  {
    title: "Kodachadri Trek",
    state: "Karnataka",
    address: "Shimoga",
    DifLevel: "Moderate",
    price: 3000,
    photo: "../images/tour-img04.jpg",
    category: "Regular Trek",
    desc: "A lush, biodiverse trek featuring sweeping views of consecutive peaks, deep valleys, and the mesmerizing Hidlumane Falls.",
    featured: false,
    mapLink: "https://maps.app.goo.gl/Jq5N44v5Z91A1E7f8"
  },
  {
    title: "Tadiandamol Peak Trek",
    state: "Karnataka",
    address: "Coorg",
    DifLevel: "Moderate",
    price: 2500,
    photo: "../images/tour-img05.jpg",
    category: "Regular Trek",
    desc: "Trek to the highest point in Coorg through dense shola forests and sprawling grasslands ideal for all experience levels.",
    featured: false,
    mapLink: "https://maps.app.goo.gl/G6qW1tqyRj4Wk3qE8"
  },
  {
    title: "Skandagiri Trek",
    state: "Karnataka",
    address: "Chikkaballapur",
    DifLevel: "Moderate",
    price: 1200,
    photo: "../images/tour-img06.jpg",
    category: "Regular Trek",
    desc: "A popular night trek near Bangalore to catch the majestic sunrise above the bed of clouds at the peak's ancient ruins.",
    featured: false,
    mapLink: "https://maps.app.goo.gl/1JdEoN9yB66o2Xyq7"
  },
  {
    title: "Brahmagiri Trek",
    state: "Karnataka",
    address: "Kodagu",
    DifLevel: "Moderate",
    price: 3200,
    photo: "../images/tour-img07.jpg",
    category: "Regular Trek",
    desc: "A deeply forested trek bordering Kerala and Karnataka that leads to a beautiful mountain ridge and the spectacular Iruppu falls.",
    featured: false,
    mapLink: "https://maps.app.goo.gl/Ytq7X15D4SxE57kF9"
  },
  {
    title: "Gokarna Beach Trek",
    state: "Karnataka",
    address: "Gokarna",
    DifLevel: "Easy",
    price: 2000,
    photo: "../images/tour-img08.jpg",
    category: "Regular Trek",
    desc: "A unique coastal trek that scales the hills along the Arabian Sea, connecting sequentially five pristine, beautiful beaches.",
    featured: false,
    mapLink: "https://maps.app.goo.gl/3A5T3Z1H5GQE3A1g8"
  }
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connection successful for seeding.");

    for (let trek of treks) {
      // Check if title already exists to prevent duplicate key error
      const existingTrek = await Tour.findOne({ title: trek.title });
      if (!existingTrek) {
        const newTrek = new Tour(trek);
        await newTrek.save();
        console.log(`Inserted: ${trek.title}`);
      } else {
        console.log(`Already exists: ${trek.title}`);
      }
      await delay(500); // 500ms delay to prevent crashing
    }
  } catch (err) {
    console.error("Error seeding DB:", err);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedDB();
