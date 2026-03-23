import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "../models/Tour.js";

dotenv.config();

const treks = [
  {
    title: "Kheerganga Trek",
    state: "Himachal Pradesh",
    address: "Kullu",
    DifLevel: "Easy",
    price: 1500,
    photo: "../images/tour-img01.jpg",
    category: "Regular Trek",
    desc: "A beautiful trek in the Parvati Valley leading to natural hot springs. Rejuvenating and serene.",
    featured: true,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Triund Trek",
    state: "Himachal Pradesh",
    address: "Dharamshala",
    DifLevel: "Easy",
    price: 1200,
    photo: "../images/tour-img02.jpg",
    category: "Regular Trek",
    desc: "An easy and very popular trek offering majestic views of the Dhauladhar range and Kangra valley.",
    featured: true,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Hampta Pass Trek",
    state: "Himachal Pradesh",
    address: "Manali",
    DifLevel: "Moderate",
    price: 6000,
    photo: "../images/tour-img03.jpg",
    category: "Regular Trek",
    desc: "Crossover trek from lush green Kullu valley to barren Spiti valley. Stunning contrast of landscapes.",
    featured: true,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Beas Kund Trek",
    state: "Himachal Pradesh",
    address: "Manali",
    DifLevel: "Moderate",
    price: 3500,
    photo: "../images/tour-img04.jpg",
    category: "Regular Trek",
    desc: "Trek to the source of the Beas River, surrounded by towering snow-capped peaks.",
    featured: false,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Prashar Lake Trek",
    state: "Himachal Pradesh",
    address: "Mandi",
    DifLevel: "Moderate",
    price: 1800,
    photo: "../images/tour-img05.jpg",
    category: "Regular Trek",
    desc: "A trek to the crystal clear mystical lake with a floating island, offering 180-degree views of the Himalayas.",
    featured: false,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Bhrigu Lake Trek",
    state: "Himachal Pradesh",
    address: "Manali",
    DifLevel: "Moderate",
    price: 4500,
    photo: "../images/tour-img06.jpg",
    category: "Regular Trek",
    desc: "Famous for its high altitude alpine meadows and the sacred Bhrigu lake that changes colors.",
    featured: false,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Pin Parvati Pass Trek",
    state: "Himachal Pradesh",
    address: "Spiti",
    DifLevel: "Hard",
    price: 15000,
    photo: "../images/tour-img07.jpg",
    category: "Regular Trek",
    desc: "A tough and very thrilling trans-Himalayan trek connecting Parvati valley with Pin valley in Spiti.",
    featured: true,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Kareri Lake Trek",
    state: "Himachal Pradesh",
    address: "Dharamshala",
    DifLevel: "Moderate",
    price: 3000,
    photo: "../images/tour-img08.jpg",
    category: "Regular Trek",
    desc: "A glacial lake out in the Dhauladhar ranges, ideal for weekend nature escapades.",
    featured: false,
    mapLink: "https://maps.google.com/"
  }
];

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
    }
  } catch (err) {
    console.error("Error seeding DB:", err);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedDB();
