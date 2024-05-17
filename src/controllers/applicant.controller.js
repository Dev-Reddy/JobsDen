//Desc: This file contains the controller functions for the applicant routes

// Importing the required models and modules

import ApplicantModel from "../models/applicant.model.js";
import JobModel from "../models/job.model.js";
import { sendApplyEmail } from "./sendMail.js";

//Creating the Applicant Controller Class

class ApplicantController {
  // --------------------------------------------------------

  //Get all the applicants for a particular job - GET /jobs/:id/applicants
  //Render the applicants page with the job details and the list of applicants
  //Route to controller path - app.get("/jobs/:id/applicants", applicantController.getAllApplicants);

  getAllApplicants(req, res) {
    //Get the job id from the request parameters
    const jobId = req.params.id;

    //Get the job details using the job id
    const job = JobModel.getJobById(jobId);

    //If the job does not exist, render the 404 page
    if (!job) {
      return res.status(404).render("404", {
        errorMessage: "Job not found!",
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }

    //If another recruiter tries to access the applicants page of a job that does not belong to them, render the 404 page
    const userEmail = req.session.userEmail;
    if (job.recruiterEmail !== userEmail) {
      return res.status(404).render("404", {
        errorMessage:
          "You are not authorized to view the applicants of this job!",
        userEmail,
        userName: req.session.userName,
      });
    }

    //Render the applicants page with the job details so that the list of applicants can be rendered
    res.render("applicants", {
      job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  // --------------------------------------------------------

  // Apply for a job - Add the applicant to the job and send them an email - POST /jobs/:id/apply
  //Route to controller path - app.post("/apply/:id", fileUpload, applicationValidateRequest, applicantController.applyForJob);

  applyForJob(req, res) {
    //Get the job id from the request parameters
    const jobId = req.params.id;

    //Get the job details using the job id
    const job = JobModel.getJobById(jobId);

    //Get the applicant details from the request body
    const { name, email, contact } = req.body;

    //Get the path of the resume file uploaded by the applicant
    const resumePath = "uploads/" + req.file.filename;

    //Add the applicant to the applicants model database
    const newApplicant = ApplicantModel.add(name, email, contact, resumePath);

    //If the job does not have any applicants, create an empty array to store the applicants
    if (!job.applicants) {
      job.applicants = [];
    }

    //Add the new applicant to the job's list of applicants
    job.applicants.push(newApplicant);

    //Send an email to the applicant
    sendApplyEmail(job, newApplicant);

    //Redirect the applicant to the job details page
    res.redirect(`/jobs/${jobId}`);
  }

  // --------------------------------------------------------
}

//Exporting the Applicant Controller Class
export default ApplicantController;
