// Desc: This file contains the middleware that checks if the user is logged in that is if the user is a recruiter.

// Check if the user is logged in that is if the user is a recruiter
// If the user is logged in, call the next middleware
// If the user is not logged in, render the 404 page with an error message

//Route to controller path - app.get("/new-job", auth, jobController.getNewJob);
//Route to controller path - app.get("/jobs/:id/update", auth, jobController.getUpdateJob);
//Route to controller path - app.post("/new-job", auth, jobCreateValidateRequest, jobController.createJob);
//Route to controller path - app.post("/jobs/:id/update", auth, jobUpdateValidateRequest, jobController.updateJob);
//Route to controller path - app.post("/jobs/:id/delete", auth, jobController.deleteJob);

export const auth = (req, res, next) => {
  //checking if the user is logged in that is if the user is a recruiter

  //if the user is logged in, call the next middleware
  if (req.session.userEmail) {
    next();
  }
  //if the user is not logged in, render the 404 page with an error message
  else {
    res.render("404", {
      errorMessage:
        "Only a recruiter is allowed to access this page. Please login as a recruiter to continue.",
      userEmail: null,
      userName: null,
    });
  }
};
