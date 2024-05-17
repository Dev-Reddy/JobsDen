// Desc: Middleware to validate the login request.

//Import the user model
import UserModel from "../models/user.model.js";

//Middleware to validate the login request
//Route to controller path - app.post("/login", loginValidateRequest, userController.postLogin);

export const loginValidateRequest = (req, res, next) => {
  //get the user details from the request body
  const { email, password } = req.body;

  //check if the user is valid
  const ifExists = UserModel.isEmailRegistered(email);
  //if user is valid, set the user email in the session and redirect to jobs page
  if (!ifExists) {
    return res.render("login", {
      errorMessage: "User does not exist. Please register first.",
      userEmail: null,
      userName: null,
    });
  }

  //if user exists call the next middleware
  next();
};
