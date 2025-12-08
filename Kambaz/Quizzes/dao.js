import { v4 as uuidv4 } from "uuid";
import CourseModel from "../Courses/model.js";

export default function QuizzesDao() {
  
  // Find all quizzes for a course
  const findQuizzesForCourse = async (courseId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return [];
    return course.quizzes;
  };

  // Create a new quiz
  const createQuiz = async (courseId, quizData) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const newQuiz = {
      _id: uuidv4(),
      title: "Untitled Quiz",
      description: "",
      questions: [],
      points: 0,
      ...quizData,
      course: courseId,
    };

    course.quizzes.push(newQuiz);
    await course.save();
    return newQuiz;
  };

  // Update a quiz
  const updateQuiz = async (courseId, quizId, updates) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const quiz = course.quizzes.id(quizId);
    if (!quiz) return null;

    Object.assign(quiz, updates);
    await course.save();
    return quiz;
  };

  // Delete a quiz
  const deleteQuiz = async (courseId, quizId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    course.quizzes = course.quizzes.filter(q => q._id !== quizId);
    await course.save();
    return true;
  };

  // Find a single quiz
  const findQuizById = async (courseId, quizId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const quiz = course.quizzes.id(quizId);
    return quiz;
  };

  // Add a question to a quiz
  const addQuestion = async (courseId, quizId, questionData) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const quiz = course.quizzes.id(quizId);
    if (!quiz) return null;

    const newQuestion = {
      _id: uuidv4(),
      type: "MULTIPLE_CHOICE",
      title: "Untitled Question",
      points: 1,
      question: "",
      choices: [],
      ...questionData
    };

    quiz.questions.push(newQuestion);
    
    // Update total quiz points
    quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
    
    await course.save();
    return newQuestion;
  };

  // Update a question
  const updateQuestion = async (courseId, quizId, questionId, updates) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const quiz = course.quizzes.id(quizId);
    if (!quiz) return null;

    const questionIndex = quiz.questions.findIndex(q => q._id === questionId);
    if (questionIndex === -1) return null;

    Object.assign(quiz.questions[questionIndex], updates);
    
    // Update total quiz points
    quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
    
    await course.save();
    return quiz.questions[questionIndex];
  };

  // Delete a question
  const deleteQuestion = async (courseId, quizId, questionId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const quiz = course.quizzes.id(quizId);
    if (!quiz) return null;

    quiz.questions = quiz.questions.filter(q => q._id !== questionId);
    
    // Update total quiz points
    quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
    
    await course.save();
    return true;
  };

  return {
    findQuizzesForCourse,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    findQuizById,
    addQuestion,
    updateQuestion,
    deleteQuestion
  };
}