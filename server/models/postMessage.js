import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('PostMessage', postSchema);