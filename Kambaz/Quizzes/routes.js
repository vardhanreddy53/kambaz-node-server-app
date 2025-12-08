import QuizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  const dao = QuizzesDao();

  // Get all quizzes for a course
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  // Get a single quiz
  const findQuizById = async (req, res) => {
    const { courseId, quizId } = req.params;
    const quiz = await dao.findQuizById(courseId, quizId);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    res.json(quiz);
  };

  // Create a new quiz
  const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    const newQuiz = await dao.createQuiz(courseId, req.body);
    if (!newQuiz) {
      return res.status(404).send("Course not found");
    }
    res.json(newQuiz);
  };

  // Update a quiz
  const updateQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    const updatedQuiz = await dao.updateQuiz(courseId, quizId, req.body);
    if (!updatedQuiz) {
      return res.status(404).send("Quiz not found");
    }
    res.json(updatedQuiz);
  };

  // Delete a quiz
  const deleteQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    const success = await dao.deleteQuiz(courseId, quizId);
    if (!success) {
      return res.status(404).send("Quiz not found");
    }
    res.sendStatus(200);
  };

  // Add a question to a quiz
  const addQuestion = async (req, res) => {
    const { courseId, quizId } = req.params;
    const newQuestion = await dao.addQuestion(courseId, quizId, req.body);
    if (!newQuestion) {
      return res.status(404).send("Quiz not found");
    }
    res.json(newQuestion);
  };

  // Update a question
  const updateQuestion = async (req, res) => {
    const { courseId, quizId, questionId } = req.params;
    const updatedQuestion = await dao.updateQuestion(courseId, quizId, questionId, req.body);
    if (!updatedQuestion) {
      return res.status(404).send("Question not found");
    }
    res.json(updatedQuestion);
  };

  // Delete a question
  const deleteQuestion = async (req, res) => {
    const { courseId, quizId, questionId } = req.params;
    const success = await dao.deleteQuestion(courseId, quizId, questionId);
    if (!success) {
      return res.status(404).send("Question not found");
    }
    res.sendStatus(200);
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/courses/:courseId/quizzes/:quizId", findQuizById);
  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.put("/api/courses/:courseId/quizzes/:quizId", updateQuiz);
  app.delete("/api/courses/:courseId/quizzes/:quizId", deleteQuiz);
  
  app.post("/api/courses/:courseId/quizzes/:quizId/questions", addQuestion);
  app.put("/api/courses/:courseId/quizzes/:quizId/questions/:questionId", updateQuestion);
  app.delete("/api/courses/:courseId/quizzes/:quizId/questions/:questionId", deleteQuestion);
}