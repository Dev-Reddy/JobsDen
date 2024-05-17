// Desc: Middleware to check if user exists while Registration - if user exists, render the home page with an error message

//Importing UserModel from models
import UserModel from "../models/user.model.js";

//Middleware to check if user exists while Registration - if user exists, render the home page with an error message
//Route to controller path - app.post("/register", checkUserExists, registrationValidateRequest, userController.postRegister);

export const checkUserExists = (req, res, next) => {
  //get the email from the request body
  const { email } = req.body;

  //check if the user exists
  const user = UserModel.isEmailRegistered(email);

  //if user exists, render the home page with an error message
  if (user) {
    return res.render("home", {
      errorMessage: "User already exists. Please login.",
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //if user does not exist, call the next middleware
  next();
};
