import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

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
  // needed to avoid false positives like in 12 chars long strings
  const ObjectId = mongoose.Types.ObjectId;
  const isObjectIdValid = ObjectId.isValid(id)
    && String(new ObjectId(id) === id);

  if (!req.body || !isObjectIdValid) {
    res.status(400).json({ message: 'bad request' });
  }

  const { id: bodyId, ...updatedPost } = req.body;
  const post = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(post);
}
