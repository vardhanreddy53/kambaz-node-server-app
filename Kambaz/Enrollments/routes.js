import EnrollmentsDao from "./dao.js";

const EnrollmentRoutes = (app, db) => {
    const dao = EnrollmentsDao(db); 

    const enrollInCourse = async (req, res) => {
        const { userId, courseId } = req.params;

        try {
            const newEnrollment = dao.enrollUserInCourse(userId, courseId);
            res.status(201).send(newEnrollment);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    const unenrollFromCourse = async (req, res) => {
        const { userId, courseId } = req.params;
        try {
            const deleted = dao.unenrollUserFromCourse(userId, courseId);
            if (deleted) {
                res.sendStatus(204);
            } else {
                res.status(404).send("Enrollment not found");
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    const findCoursesForUser = async (req, res) => {
        const { userId } = req.params;
        try {
            const userEnrollments = dao.findEnrollmentsByUser(userId);
            res.json(userEnrollments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    const findUsersInCourse = async (req, res) => {
        const { courseId } = req.params;
        try {
            const courseEnrollments = dao.findEnrollmentsByCourse(courseId);
            res.json(courseEnrollments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    app.post("/api/kambaz/users/:userId/enrollments/courses/:courseId", enrollInCourse);
    app.delete("/api/kambaz/users/:userId/enrollments/courses/:courseId", unenrollFromCourse);
    app.get("/api/kambaz/users/:userId/enrollments", findCoursesForUser);
    app.get("/api/kambaz/courses/:courseId/enrollments", findUsersInCourse);
};

export default EnrollmentRoutes;