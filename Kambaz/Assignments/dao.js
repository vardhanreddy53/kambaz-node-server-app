import { v4 as uuidv4 } from "uuid";
import CourseModel from "../Courses/model.js";

export default function AssignmentsDao() {

  const findAssignmentsForCourse = async (courseId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return [];
    return course.assignments;
  };

  const createAssignment = async (courseId, assignmentData) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const newAssignment = {
      _id: uuidv4(),
      ...assignmentData,
    };

    course.assignments.push(newAssignment);
    await course.save();

    return newAssignment;
  };

  const updateAssignment = async (courseId, assignmentId, updates) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const assignment = course.assignments.id(assignmentId);
    if (!assignment) return null;

    Object.assign(assignment, updates);
    await course.save();

    return assignment;
  };

  const deleteAssignment = async (courseId, assignmentId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    course.assignments = course.assignments.filter(a => a._id !== assignmentId);
    await course.save();

    return true;
  };

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
