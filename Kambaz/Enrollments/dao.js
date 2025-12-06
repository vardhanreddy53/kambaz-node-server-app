export default function EnrollmentsDao(db) {
  async function enrollUserInCourse(userId, courseId) {
    const exists = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );

    if (exists) return null;

    const newEnrollment = {
      _id: Date.now().toString(),
      user: userId,
      course: courseId,
    };

    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  async function unenrollUserFromCourse(userId, courseId) {
    const index = db.enrollments.findIndex(
      (e) => e.user === userId && e.course === courseId
    );

    if (index === -1) return false;

    db.enrollments.splice(index, 1);
    return true;
  }

  async function findEnrollmentsByUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  async function findEnrollmentsByCourse(courseId) {
    return db.enrollments.filter((e) => e.course === courseId);
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsByUser,
    findEnrollmentsByCourse,
  };
}
