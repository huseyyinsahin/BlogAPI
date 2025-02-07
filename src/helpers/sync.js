"use strict";

const Category = require("../models/category");

const categories = [
  { name: "Technology" },
  { name: "Health" },
  { name: "Business" },
  { name: "Education" },
  { name: "Travel" },
  { name: "Food" },
  { name: "Entertainment" },
  { name: "Sports" },
];

const addCategories = async () => {
  try {
    await Category.deleteMany({});
    console.log("All categories deleted successfully!");
  } catch (error) {
    console.error("Error deleting categories:", error);
  }
  try {
    await Category.insertMany(categories, { ordered: false });
    console.log("Categories added successfully!");
  } catch (error) {
    console.error("Error adding categories:", error);
  }
};

module.exports = addCategories;
