// Desc: Middleware to validate registration request

//Importing express-validator
import { body, validationResult } from "express-validator";

//Middleware to validate registration request -
//Route to controller path - app.post("/register", checkUserExists, registrationValidateRequest, userController.postRegister);

export const registrationValidateRequest = async (req, res, next) => {
  //Setup rules for validation.
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().isEmail().withMessage("Enter a valid email"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ];

  //run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  //check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  //if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("home", {
      errorMessage: validationErrors.array()[0].msg,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //if no errors, call the next middleware
  next();
};
