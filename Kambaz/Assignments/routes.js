import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  const dao = AssignmentsDao();
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignmentForCourse = async (req, res) => {
    const { courseId } = req.params;
    const newAssignment = await dao.createAssignment(courseId, req.body);

    if (!newAssignment) {
      return res.sendStatus(404);
    }

    res.json(newAssignment);
  };

  const updateAssignment = async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const updatedAssignment = await dao.updateAssignment(courseId, assignmentId, req.body);

    if (!updatedAssignment) {
      return res.sendStatus(404);
    }

    res.json(updatedAssignment);
  };

  const deleteAssignment = async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const success = await dao.deleteAssignment(courseId, assignmentId);

    if (!success) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  };
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignment);
  app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignment);
}
