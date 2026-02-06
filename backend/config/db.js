import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://prajitha:246810@cluster0.sqeurda.mongodb.net/food-del",
    )
    .then(() => console.log("Db connected"));
};
