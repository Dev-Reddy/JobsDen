// Desc: Middleware to set a cookie with the last visit time of the user

//This middleware is used to set a cookie with the last visit time of the user
//Route to controller path - app.get("/", setLastVisit, jobController.getHome);

export const setLastVisit = (req, res, next) => {
  //if cookie is set, then add a local variable with last visit time data
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }

  //set the cookie with the last visit time
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000, //2 days
  });

  //call the next middleware
  next();
};
