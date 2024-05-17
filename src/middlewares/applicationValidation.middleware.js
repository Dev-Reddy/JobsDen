// Desc: Middleware to validate the form data for applying for a job

//Importing the required packages and models
import { body, validationResult } from "express-validator";
import JobModel from "../models/job.model.js";

//Validate the form data for applying for a job
//Route to controller path - app.post("/apply/:id", fileUpload, applicationValidateRequest, applicantController.applyForJob);

export const applicationValidateRequest = async (req, res, next) => {
  // Setup rules for validation.
  const rules = [
    body("name").notEmpty().withMessage("Enter valid name"),
    body("email").notEmpty().isEmail().withMessage("Enter valid email"),
    body("contact").notEmpty().withMessage("Enter valid contact number"),
    body("resume").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Resume is required");
      }
      return true;
    }),
  ];

  // run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  //get the job id from the request parameters
  const jobId = req.params.id;

  //get the job details using the job id
  const job = JobModel.getJobById(jobId);

  //check if job exists - if not, return 404
  if (!job) {
    return res.status(404).render("404", {
      errorMessage: "Job not found!",
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //check if already applied
  const alreadyApplied = JobModel.checkIfApplied(
    jobId,
    req.body.email,
    req.body.contact
  );

  //if already applied, render the job page with an error message
  if (alreadyApplied) {
    return res.render("job", {
      job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMessage: "You have already applied for this job",
    });
  }

  // if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("job", {
      job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  //if no errors, move to the next middleware
  next();
};
