import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import "dotenv/config";
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js";
import QuizAttempt from "./Kambaz/QuizAttempts/routes.js"
import mongoose from "mongoose";


const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
   origin: process.env.CLIENT_URL || "http://localhost:3000",
})
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app,db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);
QuizRoutes(app); 
QuizAttempt(app);

Hello(app);
Lab5(app);
PathParameters(app);
QueryParameters(app)
WorkingWithObjects(app);
WorkingWithArrays(app);
app.listen(process.env.PORT || 4000);