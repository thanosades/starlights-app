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
  post.tags = post.tags ? post.tags.split(',') : [];
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
  const isObjectIdValid = ObjectId.isValid(id) && String(new ObjectId(id) === id);
  const post = req.body;

  if (!isObjectIdValid || !post) {
    res.status(400).json({ message: 'Malformed patch document' });
  }

  try {
    const updatedPost = PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}