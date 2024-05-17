// Desc: User model to handle user data

// Creating the UserModel class
export default class UserModel {
  // ---------------------------------------------------------

  //properties of the user model
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // ---------------------------------------------------------

  //to get all users

  static getAll() {
    return users;
  }

  // ---------------------------------------------------------

  //to add a user

  static add(name, email, password) {
    //make a new user object
    const newUser = new UserModel(users.length + 1, name, email, password);

    //add the user to the users array
    users.push(newUser);
  }

  // ---------------------------------------------------------

  //confirming if the user is valid for login

  static isValidUser(email, password) {
    //find the user with the given email and password
    return users.find(
      (user) => user.email === email && user.password === password
    );
  }

  // ---------------------------------------------------------

  //check if the email is already registered that is, the user already exists

  static isEmailRegistered(email) {
    //find the user with the given email and return it
    return users.find((user) => user.email === email);
  }
  // ---------------------------------------------------------
}

//array of all users
let users = [new UserModel(1, "John Doe", "john@doe.com", "123")];
