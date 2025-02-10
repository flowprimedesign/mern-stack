//import express from 'express';
import express from "express";

//import dotenv from 'dotenv';
import dotenv from "dotenv";
dotenv.config();

//import connectDB from './config/db.js';
import { connectDB } from "./config/db.js";

//import product
import Product from "./models/product.model.js";

const app = express();

//middleware
app.use(express.json()); //allows to accept json data in the req.body

// test the localhost5000
// app.get("/", (req, res) => {
//   res.send("server is readyfsdfasf");
// });

//post request to create a product in the database. can see it through postman
app.post("/api/products", (req, res) => {
  const product = req.body; //get the product from the request

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct = new Product(product);

  try {
    newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in create product: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

//api request to delete product
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);

  //grabs that id the deletes it
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "product not found" });
  }
});

//connect to the mongoDB through the .env file which has the mongoURI
//console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("server starter at localhost:5000");
});
