import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

  // needed to avoid false positives
const checkForValidId = (id) => {
  const ObjectId = mongoose.Types.ObjectId;
  return ObjectId.isValid(id) && String(new ObjectId(id) === id);
}

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  let { id } = req.params;

  if (!req.body || !checkForValidId(id)) {
    res.status(400).json({ message: 'bad request' });
  }

  const { id: bodyId, ...updatedPost } = req.body;
  const post = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(post);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!checkForValidId(id)) {
    return res.status(404).json({ message: 'Not found' });
  }

  await PostMessage.findByIdAndDelete(id);

  res.status(200).end();
}
