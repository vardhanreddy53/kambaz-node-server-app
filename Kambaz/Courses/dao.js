import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";
import EnrollmentModel from "../Enrollments/model.js";

export default function CoursesDao() {

  function findAllCourses() {
    return CourseModel.find({});
  }

  async function findCoursesForEnrolledUser(userId) {
    const enrollments = await EnrollmentModel.find({ user: userId });

    const courseIds = enrollments.map((e) => e.course);

    return CourseModel.find({ _id: { $in: courseIds } });
  }

  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return CourseModel.create(newCourse);
  }

  async function deleteCourse(courseId) {
    await EnrollmentModel.deleteMany({ course: courseId });
    return CourseModel.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, updates) {
    return CourseModel.updateOne({ _id: courseId }, { $set: updates });
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse
  };
}
