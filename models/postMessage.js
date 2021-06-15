import Mongoose from "mongoose";

const postSchema = Mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//Convert a schema to model

const PostMessage = Mongoose.model("PostMessage", postSchema);

export default PostMessage;
