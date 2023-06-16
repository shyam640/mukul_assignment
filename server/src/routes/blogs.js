import express from "express";
import mongoose from "mongoose";
import { BlogModel } from "../models/Blog.js";
import { UserModel } from "../models/User.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await BlogModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const blog = new BlogModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  console.log(blog);

  try {
    const result = await blog.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a recipe by ID
router.get("/:blogId", async (req, res) => {
  try {
    const result = await BlogModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  const blog = await BlogModel.findById(req.body.blogID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedBlog.push(blog);
    await user.save();
    res.status(201).json({ savedBlog: user.savedBlog });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved Blog
router.get("/savedBlog/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedBlog: user?.savedBlog });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved Blog
router.get("/savedBlog/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedBlog = await BlogModel.find({
      _id: { $in: user.savedBlog },
    });

    console.log(savedBlog);
    res.status(201).json({ savedBlog });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as blogRouter };