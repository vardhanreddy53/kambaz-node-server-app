import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  _id: String,
  quiz: String,
  user: String,
  course: String,
  attemptNumber: Number,
  score: Number,
  answers: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed, // Can be string, boolean, or array
  }],
  submittedAt: { type: Date, default: Date.now },
  timeSpent: Number, // in minutes
});

export default quizAttemptSchema;