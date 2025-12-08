import { v4 as uuidv4 } from "uuid";
import QuizAttemptModel from "./model.js";

export default function QuizAttemptsDao() {
  
  // Create a new quiz attempt
  const createAttempt = async (attemptData) => {
    const newAttempt = {
      _id: uuidv4(),
      ...attemptData,
      submittedAt: new Date(),
    };
    
    await QuizAttemptModel.create(newAttempt);
    return newAttempt;
  };

  // Find all attempts for a specific user and quiz
  const findAttemptsByUserAndQuiz = async (userId, quizId) => {
    const attempts = await QuizAttemptModel.find({ 
      user: userId, 
      quiz: quizId 
    }).sort({ submittedAt: -1 }); // Most recent first
    return attempts;
  };

  // Find the latest attempt for a user and quiz
  const findLatestAttempt = async (userId, quizId) => {
    const attempt = await QuizAttemptModel.findOne({ 
      user: userId, 
      quiz: quizId 
    }).sort({ submittedAt: -1 });
    return attempt;
  };

  // Count attempts for a user and quiz
  const countAttempts = async (userId, quizId) => {
    const count = await QuizAttemptModel.countDocuments({ 
      user: userId, 
      quiz: quizId 
    });
    return count;
  };

  // Find all attempts for a quiz (for faculty to see all student attempts)
  const findAttemptsByQuiz = async (quizId) => {
    const attempts = await QuizAttemptModel.find({ quiz: quizId })
      .sort({ submittedAt: -1 });
    return attempts;
  };

  // Find all attempts by a user in a course
  const findAttemptsByUserAndCourse = async (userId, courseId) => {
    const attempts = await QuizAttemptModel.find({ 
      user: userId, 
      course: courseId 
    }).sort({ submittedAt: -1 });
    return attempts;
  };

  // Get a specific attempt by ID
  const findAttemptById = async (attemptId) => {
    const attempt = await QuizAttemptModel.findById(attemptId);
    return attempt;
  };

  return {
    createAttempt,
    findAttemptsByUserAndQuiz,
    findLatestAttempt,
    countAttempts,
    findAttemptsByQuiz,
    findAttemptsByUserAndCourse,
    findAttemptById,
  };
}