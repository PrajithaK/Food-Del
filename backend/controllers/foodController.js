import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food items

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  console.log("BODY 👉", req.body);
  console.log("FILE 👉", req.file);

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Error" });
  }
};


// update food item (with image)

const updateFood = async (req, res) => {
  try {
    const { id, name, category, price } = req.body;

    const food = await foodModel.findById(id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    let updatedData = {
      name,
      category,
      price
    };

    // if new image uploaded
    if (req.file) {
      // delete old image
      fs.unlink(`uploads/${food.image}`, () => {});
      updatedData.image = req.file.filename;
    }

    await foodModel.findByIdAndUpdate(id, updatedData);

    res.json({
      success: true,
      message: "Food updated successfully"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error updating food"
    });
  }
};



export { addFood, listFood, removeFood, updateFood};
