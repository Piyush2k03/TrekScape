import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "../models/Tour.js";

dotenv.config();

const treks = [
  {
    title: "Roopkund Trek",
    state: "Uttarakhand",
    address: "Chamoli",
    DifLevel: "Hard",
    price: 9000,
    photo: "../images/tour-img01.jpg",
    category: "Regular Trek",
    desc: "A legendary high-altitude trek known for its mysterious Skeleton Lake and breathtaking views of Mt. Trishul.",
    featured: true,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Valley of Flowers Trek",
    state: "Uttarakhand",
    address: "Chamoli",
    DifLevel: "Moderate",
    price: 8500,
    photo: "../images/tour-img02.jpg",
    category: "Regular Trek",
    desc: "A vibrant Himalayan trek into a UNESCO World Heritage site, displaying millions of blooming alpine flowers.",
    featured: true,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Kedarkantha Trek",
    state: "Uttarakhand",
    address: "Uttarkashi",
    DifLevel: "Moderate",
    price: 6500,
    photo: "../images/tour-img03.jpg",
    category: "Regular Trek",
    desc: "One of India's most popular winter treks featuring a thrilling summit climb and dense pine forests.",
    featured: true,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Kuari Pass Trek",
    state: "Uttarakhand",
    address: "Joshimath",
    DifLevel: "Moderate",
    price: 7000,
    photo: "../images/tour-img04.jpg",
    category: "Regular Trek",
    desc: "An unparalleled view of India's highest peaks, including Nanda Devi, makes this Lord Curzon trail a classic.",
    featured: false,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Har Ki Dun Trek",
    state: "Uttarakhand",
    address: "Uttarkashi",
    DifLevel: "Moderate",
    price: 8000,
    photo: "../images/tour-img05.jpg",
    category: "Regular Trek",
    desc: "Step back in time in the Valley of Gods, passing through ancient wooden villages with views of Swargarohini.",
    featured: false,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Pangarchulla Peak Trek",
    state: "Uttarakhand",
    address: "Joshimath",
    DifLevel: "Hard",
    price: 9500,
    photo: "../images/tour-img06.jpg",
    category: "Regular Trek",
    desc: "A demanding summit climb scaling a sharp ridge with rewarding close-up views of Nanda Devi sanctuary peaks.",
    featured: false,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Nag Tibba Trek",
    state: "Uttarakhand",
    address: "Mussoorie",
    DifLevel: "Easy",
    price: 3500,
    photo: "../images/tour-img07.jpg",
    category: "Regular Trek",
    desc: "An excellent weekend getaway near Mussoorie, offering superb views of the Bandarpunch and Gangotri peaks.",
    featured: false,
    mapLink: "https://maps.google.com/"
  },
  {
    title: "Dayara Bugyal Trek",
    state: "Uttarakhand",
    address: "Uttarkashi",
    DifLevel: "Easy",
    price: 5500,
    photo: "../images/tour-img08.jpg",
    category: "Regular Trek",
    desc: "Sprawling across vast expanses, these high-altitude meadows are considered among the most beautiful in India.",
    featured: false,
    mapLink: "https://maps.google.com/"
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
