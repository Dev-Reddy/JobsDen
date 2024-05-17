// Desc: Middleware to validate the form data for updating a job

//Import packages and models
import { body, validationResult } from "express-validator";
import JobModel from "../models/job.model.js";

// Validate the form data for updating a job
//Router to controller path - app.post("/jobs/:id/update", auth, jobUpdateValidateRequest, jobController.updateJob);

export const jobUpdateValidateRequest = async (req, res, next) => {
  //Setup rules for validation.
  const rules = [
    body("jobcategory").notEmpty().withMessage("Job category is required"),
    body("jobdesignation")
      .notEmpty()
      .withMessage("Job designation is required"),
    body("joblocation").notEmpty().withMessage("Job location is required"),
    body("companyname").notEmpty().withMessage("Company name is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
    body("applyby").notEmpty().withMessage("Apply by is required"),
    body("skillsrequired")
      .notEmpty()
      .withMessage("Skills required is required"),
    body("numberofopenings")
      .notEmpty()
      .withMessage("Number of openings is required"),
  ];

  //run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  //check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  //if errros, return the error message

  //get job
  const jobId = req.params.id;

  //get the job details using the job id
  const job = JobModel.getJobById(jobId);

  //check if job exists - if not, return 404
  if (!job) {
    return res.render("404", {
      errorMessage: "Job not found",
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //if errors, render the update job page with the error message
  if (!validationErrors.isEmpty()) {
    return res.render("updateJob", {
      job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  //if no errors, call the next middleware
  next();
};
