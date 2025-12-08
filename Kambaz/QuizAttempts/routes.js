import QuizAttemptsDao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  const dao = QuizAttemptsDao();

  // Submit a quiz attempt
  const submitAttempt = async (req, res) => {
    try {
      const { userId, quizId, courseId } = req.params;
      const { answers, score, timeSpent } = req.body;

      // Count existing attempts
      const attemptCount = await dao.countAttempts(userId, quizId);

      const newAttempt = await dao.createAttempt({
        quiz: quizId,
        user: userId,
        course: courseId,
        attemptNumber: attemptCount + 1,
        score,
        answers,
        timeSpent,
      });

      res.json(newAttempt);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Get all attempts for a user and quiz
  const getAttemptsByUserAndQuiz = async (req, res) => {
    try {
      const { userId, quizId } = req.params;
      const attempts = await dao.findAttemptsByUserAndQuiz(userId, quizId);
      res.json(attempts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Get latest attempt for a user and quiz
  const getLatestAttempt = async (req, res) => {
    try {
      const { userId, quizId } = req.params;
      const attempt = await dao.findLatestAttempt(userId, quizId);
      if (!attempt) {
        return res.status(404).send("No attempts found");
      }
      res.json(attempt);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Get all attempts for a quiz (faculty only)
  const getAttemptsByQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const attempts = await dao.findAttemptsByQuiz(quizId);
      res.json(attempts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Get all attempts by user in a course
  const getAttemptsByUserAndCourse = async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const attempts = await dao.findAttemptsByUserAndCourse(userId, courseId);
      res.json(attempts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Get specific attempt by ID
  const getAttemptById = async (req, res) => {
    try {
      const { attemptId } = req.params;
      const attempt = await dao.findAttemptById(attemptId);
      if (!attempt) {
        return res.status(404).send("Attempt not found");
      }
      res.json(attempt);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Register routes
  app.post("/api/courses/:courseId/quizzes/:quizId/attempts/:userId", submitAttempt);
  app.get("/api/quizzes/:quizId/attempts/user/:userId", getAttemptsByUserAndQuiz);
  app.get("/api/quizzes/:quizId/attempts/user/:userId/latest", getLatestAttempt);
  app.get("/api/quizzes/:quizId/attempts", getAttemptsByQuiz);
  app.get("/api/courses/:courseId/attempts/user/:userId", getAttemptsByUserAndCourse);
  app.get("/api/attempts/:attemptId", getAttemptById);
}