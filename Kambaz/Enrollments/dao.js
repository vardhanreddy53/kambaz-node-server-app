import EnrollmentModel from "./model.js";

export default function EnrollmentsDao() {
  async function enrollUserInCourse(userId, courseId) {
    // Check if enrollment already exists in database
    const exists = await EnrollmentModel.findOne({
      user: userId,
      course: courseId
    });

    if (exists) return null;

    // Create and SAVE to database
    const newEnrollment = new EnrollmentModel({
      _id: Date.now().toString(),
      user: userId,
      course: courseId,
      enrollmentDate: new Date(),
      status: "ENROLLED"
    });

    await newEnrollment.save(); // ✅ This actually saves to MongoDB!
    return newEnrollment;
  }

  async function unenrollUserFromCourse(userId, courseId) {
    // Delete from database
    const result = await EnrollmentModel.deleteOne({
      user: userId,
      course: courseId
    });

    return result.deletedCount > 0;
  }

  async function findEnrollmentsByUser(userId) {
    return await EnrollmentModel.find({ user: userId });
  }

  async function findEnrollmentsByCourse(courseId) {
    return await EnrollmentModel.find({ course: courseId });
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsByUser,
    findEnrollmentsByCourse,
  };
}