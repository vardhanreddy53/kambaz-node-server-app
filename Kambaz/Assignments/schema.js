import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  points: Number,
  dueDate: Date,
  availableFrom: Date,
  availableUntil: Date,
});

export default schema;
