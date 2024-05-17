//Desc: Middleware to validate the form data for creating a new job

//Import packages
import { body, validationResult } from "express-validator";

// Validate the form data for creating a new job
//Router to controller path - app.post("/new-job", auth, jobCreateValidateRequest, jobController.createJob);

export const jobCreateValidateRequest = async (req, res, next) => {
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

  // run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  //check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  //if errros, render the new job page with the error message
  if (!validationErrors.isEmpty()) {
    return res.render("newJob", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  //if no errors, call the next middleware
  next();
};
