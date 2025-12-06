import EnrollmentsDao from "./dao.js";

const EnrollmentRoutes = (app, db) => {
  const dao = EnrollmentsDao(db);

  const enrollInCourse = async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const enrollment = await dao.enrollUserInCourse(userId, courseId);

      if (!enrollment) {
        return res.status(400).send("User already enrolled in this course.");
      }

      res.status(201).json(enrollment);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  const unenrollFromCourse = async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const deleted = await dao.unenrollUserFromCourse(userId, courseId);

      if (!deleted) {
        return res.status(404).send("Enrollment not found");
      }

      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  const findCoursesForUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const enrollments = await dao.findEnrollmentsByUser(userId);
      res.json(enrollments);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  const findUsersInCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await dao.findEnrollmentsByCourse(courseId);
      res.json(enrollments);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  // Register routes
  app.post("/api/kambaz/users/:userId/enrollments/courses/:courseId", enrollInCourse);
  app.delete("/api/kambaz/users/:userId/enrollments/courses/:courseId", unenrollFromCourse);
  app.get("/api/kambaz/users/:userId/enrollments", findCoursesForUser);
  app.get("/api/kambaz/courses/:courseId/enrollments", findUsersInCourse);
};

export default EnrollmentRoutes;
