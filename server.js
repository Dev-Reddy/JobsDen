//import the app from index.js
import app from "./index.js";

//assigning the port
const port = 3200;
//start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Test ID: Email `john@doe.com` | Password `123`