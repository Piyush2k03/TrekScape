import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Admin credentials (you can change these)
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminUsername = process.env.ADMIN_USERNAME || "admin";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("❌ Admin user already exists with email:", adminEmail);
      
      // Update existing user to admin role
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        // Hash new password if provided
        if (adminPassword) {
          const salt = bcrypt.genSaltSync(10);
          existingAdmin.password = bcrypt.hashSync(adminPassword, salt);
        }
        await existingAdmin.save();
        console.log("✅ Updated existing user to admin role");
        console.log("📧 Email:", adminEmail);
        console.log("🔑 Password:", adminPassword);
        console.log("👤 Username:", existingAdmin.username);
      } else {
        console.log("✅ User is already an admin");
        console.log("📧 Email:", adminEmail);
        console.log("👤 Username:", existingAdmin.username);
      }
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(adminPassword, salt);

    // Create admin user
    const adminUser = new User({
      username: adminUsername,
      email: adminEmail,
      password: hash,
      role: "admin",
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);
    console.log("👤 Username:", adminUsername);
    console.log("\n⚠️  Remember to change the password after first login!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();



