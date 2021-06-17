import Mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  console.log(`Received update request id: ${_id}`);

  validateMongoObjectId(_id, res);

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(`Delete post with id: ${_id}`);

  validateMongoObjectId(_id, res);
  await PostMessage.findByIdAndDelete(_id);

  res.json({ message: "Post deleted." });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(`New like for post with id: ${_id}`);
  validateMongoObjectId(_id, res);

  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};

const validateMongoObjectId = (_id, res) => {
  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
};
