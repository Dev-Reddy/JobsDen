//Desc: This file contains the controller functions for the job routes

//Importing the JobModel class from the job.model.js file
import JobModel from "../models/job.model.js";

//Creating the Job Controller Class
class JobController {
  // --------------------------------------------------------

  //default route for home page - GET /
  //Route to controller path - app.get("/", setLastVisit, jobController.getHome);

  getHome(req, res) {
    //render the home view

    if (req.session.userEmail) {
      res.render("home", {
        userEmail: req.session.userEmail,
        userName: req.session.userName,
        errorMessage: null,
      });
    } else {
      res.render("home", {
        userEmail: null,
        userName: null,
        errorMessage: null,
      });
    }
  }

  // --------------------------------------------------------

  //Get Jobs if search query is present, else get all jobs - GET /jobs
  //Route to controller path - app.get("/jobs", jobController.getJobs);

  getJobs(req, res) {
    //get the current page from query parameters, default to 1 if not provided
    const page = req.query.page || 1; // Get the current page from query parameters, default to 1 if not provided

    //get the search query from query parameters if present
    const searchQuery = req.query.searchQuery;

    //jobs array to store the jobs
    let jobs = [];

    //if search query is present, filter the jobs based on the search query
    if (searchQuery) {
      jobs = JobModel.filterJobs(searchQuery);
    }
    //else get all jobs
    else {
      jobs = JobModel.getAll();
    }

    //Pagination Logic

    //total number of jobs
    const totalJobs = jobs.length;

    //number of jobs per page - set to 4 for now
    const itemsPerPage = 4;

    //total number of pages
    const totalPages = Math.ceil(totalJobs / itemsPerPage);

    //convert the current page to an integer
    let currentPage = parseInt(page);

    //ensure the current page is within the valid range
    currentPage = currentPage > totalPages ? totalPages : currentPage; // Ensure currentPage doesn't exceed totalPages

    currentPage = currentPage < 1 ? 1 : currentPage; // Ensure currentPage is not less than 1

    //calculate the start and end index of the jobs to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = currentPage * itemsPerPage;
    endIndex = Math.min(endIndex, totalJobs); // Ensure endIndex doesn't exceed totalJobs

    //get the jobs to be displayed on the current page
    const jobsOnPage = jobs.slice(startIndex, endIndex);

    // Pass pagination data to the view
    res.render("jobs", {
      jobs: jobsOnPage,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      totalPages: totalPages,
      currentPage: currentPage,
      searchQuery,
    });
  }

  // --------------------------------------------------------

  //Get the form to create a new job - GET /new-job
  //Route to controller path - app.get("/new-job", auth, jobController.getNewJob);

  getNewJob(req, res) {
    //get the user email from the session
    const userEmail = req.session.userEmail;

    //render the new job view with the user email
    res.render("newJob", {
      userEmail,
      userName: req.session.userName,
      errorMessage: null,
    });
  }

  // --------------------------------------------------------

  //Create a New Job - POST /new-job
  //Route to controller path - app.post("/new-job", auth, jobCreateValidateRequest, jobController.createJob);

  createJob(req, res) {
    //get the job details from the request body
    let {
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
    } = req.body;

    //if skillsrequired is a string, convert it to an array
    if (typeof skillsrequired === "string") {
      skillsrequired = [skillsrequired];
    } else if (!skillsrequired) {
      skillsrequired = [];
    }

    //get the recruiter email from the session to add to the job
    const recruiterEmail = req.session.userEmail;
    JobModel.add(
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
      recruiterEmail
    );

    //redirect to the jobs page
    res.redirect("/jobs");
  }

  // --------------------------------------------------------

  //Get the form to update a job - GET /jobs/:id/update
  //Route to controller path - app.get("/jobs/:id/update", auth, jobController.getUpdateJob);

  getUpdateJob(req, res) {
    //get the job id from the url
    const jobId = req.params.id;

    //get the job details by id from the model
    const job = JobModel.getJobById(jobId);

    //get the user email from the session
    const userEmail = req.session.userEmail;

    //if job not found, render 404 page with error message "Job not found!"
    if (!job) {
      return res.status(404).render("404", {
        errorMessage: "Job not found!",
        userEmail,
        userName: req.session.userName,
      });
    }
    //if the job's recruiter email does not match the user email, render 404 page with error message "You are not authorized to update this job!"
    else if (job.recruiterEmail !== userEmail) {
      return res.status(404).render("404", {
        errorMessage: "You are not authorized to update this job!",
        userEmail,
        userName: req.session.userName,
      });
    }

    //if the job is found and the user is authorized to update the job, render the update job view
    res.render("updateJob", {
      job,
      userEmail,
      userName: req.session.userName,
      errorMessage: null,
    });
  }

  // --------------------------------------------------------

  //Update a job's details - POST /jobs/:id/update
  //Route to controller path - app.post("/jobs/:id/update", auth, jobUpdateValidateRequest, jobController.updateJob);

  updateJob(req, res) {
    const jobId = req.params.id;

    let {
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
    } = req.body;

    if (typeof skillsrequired === "string") {
      skillsrequired = [skillsrequired];
    } else if (!skillsrequired) {
      skillsrequired = [];
    }

    JobModel.updateJob(
      jobId,
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings
    );

    //redirect to the job details page
    res.redirect("/jobs");
  }

  // --------------------------------------------------------

  //Delete a job
  //Route to controller path - app.post("/jobs/:id/delete", auth, jobController.deleteJob);

  deleteJob(req, res) {
    //get the job id from the url
    const jobId = req.params.id;

    //delete the job by id
    JobModel.deleteJob(jobId);

    //redirect to the jobs page
    res.redirect("/jobs");
  }

  // --------------------------------------------------------

  //Get details of a job - GET /jobs/:id
  //Route to controller path - app.get("/jobs/:id", jobController.getJobDetails);

  getJobDetails(req, res) {
    //getting the job id from the url
    const jobId = req.params.id;

    //getting the job details by id from the model
    const job = JobModel.getJobById(jobId);

    //get the user email from the session
    const userEmail = req.session.userEmail;

    //if job not found, render 404 page with error message "Job not found!"
    if (!job) {
      return res.status(404).render("404", {
        errorMessage: "Job not found!",
        userEmail,
        userName: req.session.userName,
      });
    }

    //render the job details view with the job details
    res.render("job", {
      job,
      userEmail,
      userName: req.session.userName,
      errorMessage: null,
    });
  }

  // --------------------------------------------------------
}

export default JobController;
