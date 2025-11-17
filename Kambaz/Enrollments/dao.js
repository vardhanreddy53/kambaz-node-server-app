import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {

    function findEnrollmentsByCourse(courseId) {
        return db.enrollments.filter((e) => e.course === courseId);
    }

    function findEnrollmentsByUser(userId) {
        return db.enrollments.filter((e) => e.user === userId);
    }

    function findEnrollment(userId, courseId) {
        return db.enrollments.find((e) => e.user === userId && e.course === courseId);
    }

    function enrollUserInCourse(userId, courseId) {
        const { enrollments } = db;
        
        const existing = findEnrollment(userId, courseId);
        if (existing) {
            return existing;
        }

        const newEnrollment = { 
            _id: uuidv4(), 
            user: userId, 
            course: courseId 
        };
        enrollments.push(newEnrollment);
        return newEnrollment;
    }
    
    function unenrollUserFromCourse(userId, courseId) {
        const initialLength = db.enrollments.length;
        db.enrollments = db.enrollments.filter(
            (e) => !(e.user === userId && e.course === courseId)
        );
        return initialLength !== db.enrollments.length;
    }

    return { 
        findEnrollmentsByCourse,
        findEnrollmentsByUser,
        findEnrollment,
        enrollUserInCourse,
        unenrollUserFromCourse,
    };
}