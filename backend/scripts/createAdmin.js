import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";
import { connectDB } from "../config/db.js";

const createAdmin = async () => {
  try {
    await connectDB(); // 👈 reuse existing DB connection

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminExists = await Admin.findOne({ email: "admin@gmail.com" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword
    });

    console.log("Admin created successfully");
    process.exit();

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

createAdmin();
