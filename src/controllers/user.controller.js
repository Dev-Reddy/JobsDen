//Desc: This file contains the controller functions for the user routes

// Importing the user model
import UserModel from "../models/user.model.js";

//Creating the User Controller Class
class UserController {
  // --------------------------------------------------------

  //render login page
  //Route to controller path - app.get("/login", userController.getLogin);

  getLogin(req, res) {
    //get the user email from the session
    const userEmail = req.session.userEmail;

    //if user is already logged in, redirect to jobs page
    if (userEmail) {
      res.redirect("/jobs");
    }
    //if user is not logged in, render the login page
    else {
      res.render("login", { errorMessage: null, userEmail, userName: null });
    }
  }

  // --------------------------------------------------------

  //Register a new user
  //Route to controller path - app.post("/register", checkUserExists, registrationValidateRequest, userController.postRegister);

  postRegister(req, res) {
    //get the user details from the request body
    const { name, email, password } = req.body;

    //add the user to the model
    UserModel.add(name, email, password);

    //redirect to login page
    res.render("login", {
      errorMessage: null,
      userEmail: null,
      userName: null,
    });
  }

  // --------------------------------------------------------

  //Login a user
  //Route to controller path - app.post("/login", loginValidateRequest, userController.postLogin);

  postLogin(req, res) {
    //get the user details from the request body
    const { email, password } = req.body;

    //check if the user is valid
    const user = UserModel.isValidUser(email, password);

    //if user is valid, set the user email in the session and redirect to jobs page
    if (user) {
      req.session.userEmail = email;
      req.session.userName = user.name;
      res.redirect("/jobs");
    }
    //if user is invalid, render the login page with the error message as "Invalid Credentials"
    else {
      res.render("login", {
        errorMessage: "Invalid credentials",
        userEmail: null,
        userName: null,
      });
    }
  }

  // --------------------------------------------------------

  //Logout a User
  //Route to controller path - app.post("/logout", userController.postLogout);

  postLogout(req, res) {
    //destroy the session and redirect to login page
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/");
    });
  }
}

//Exporting the User Controller
export default UserController;
