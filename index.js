// Test ID: Email `john@doe.com` | Password `123`

//IMPORTING NODE MODULES

import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";

// =========================================================

//IMPORTING MIDDLEWARES

import { auth } from "./src/middlewares/auth.middleware.js";
import { fileUpload } from "./src/middlewares/fileUpload.middleware.js";
import { registrationValidateRequest } from "./src/middlewares/registrationValidation.middleware.js";
import { jobUpdateValidateRequest } from "./src/middlewares/jobUpdateValidation.middleware.js";
import { jobCreateValidateRequest } from "./src/middlewares/jobCreateValidation.middlware.js";
import { applicationValidateRequest } from "./src/middlewares/applicationValidation.middleware.js";
import { checkUserExists } from "./src/middlewares/checkUserExists.middleware.js";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
import { loginValidateRequest } from "./src/middlewares/loginValidation.middleware.js";

// =========================================================

//IMPORTING CONTROLLERS

import UserController from "./src/controllers/user.controller.js";
import JobController from "./src/controllers/job.controller.js";
import ApplicantController from "./src/controllers/applicant.controller.js";

//Starting the Express app
const app = express();

//Setting the EJS View Engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// =========================================================

//MIDDLEWARES

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static Files Middleware
app.use(express.static(path.join(path.resolve(), "public")));

//EJS Layouts Middleware
app.use(ejsLayouts);

//Session Middleware
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//Cookie Parser Middleware
app.use(cookieParser());

// =========================================================

//INITIALIZING CONTROLLERS

const userController = new UserController();
const jobController = new JobController();
const applicantController = new ApplicantController();

// =========================================================

//ROUTES

//Default route for Home view and to set last visit using middleware
app.get("/", setLastVisit, jobController.getHome);

// ---------------------------------------------------------

//USER ROUTES

//Get Routes

//Get the login view
app.get("/login", userController.getLogin);

//Post Routes

//Register a new user after validating the request
app.post(
  "/register",
  checkUserExists,
  registrationValidateRequest,
  userController.postRegister
);

//Login a user after validating the request
app.post("/login", loginValidateRequest, userController.postLogin);

//Logout a user
app.post("/logout", userController.postLogout);

// ---------------------------------------------------------

//JOB ROUTES

//Get Routes

//Get all jobs if there is no search query and get the search results if there is a search query
app.get("/jobs", jobController.getJobs);

//Get Details of a particular job
app.get("/jobs/:id", jobController.getJobDetails);

//Get the form to create a new job
app.get("/new-job", auth, jobController.getNewJob);

//Get the form to update a job
app.get("/jobs/:id/update", auth, jobController.getUpdateJob);

//Post Routes

//Create a New job
app.post("/new-job", auth, jobCreateValidateRequest, jobController.createJob);

//Update a Job
app.post(
  "/jobs/:id/update",
  auth,
  jobUpdateValidateRequest,
  jobController.updateJob
);

//Delete a job
app.post("/jobs/:id/delete", auth, jobController.deleteJob);

// ---------------------------------------------------------

//APPLICANT ROUTES

//Get Routes

//Get all applicants for a job

app.get("/jobs/:id/applicants", applicantController.getAllApplicants);

app.get("/apply-page/:id", applicantController.getApplyPage);

//Post Routes

//OTP Verification for applying to a job

app.post("/otp-send/:id", applicantController.getOtpVerification);

app.post("/verify-otp/:id", applicantController.verifyOtp);

//Apply for a Job

app.post(
  "/apply/:id",
  fileUpload,
  applicationValidateRequest,
  applicantController.applyForJob
);

export default app;
