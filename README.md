# <span style="color:#2ecc71">JobsDen - Job Search Portal</span>

## <span style="color:#3498db">Description</span>

JobsDen is a job search portal built with Node.js and Express.js, designed to facilitate the job search process for both job seekers and recruiters. It provides a platform for recruiters to post job openings and manage applicants, while job seekers can browse and apply for available positions.

## <span style="color:#3498db">Installation</span>

1. Navigate to the project directory
2. Install all dependencies: `npm install`
3. Test ID: Email `john@doe.com` | Password `123`

## <span style="color:#3498db">Usage</span>

1. Start the server: `npm start`
2. Open your web browser and navigate to `http://localhost:3200` to access the JobsDen Job Search Portal.
3. Register for an account as a recruiter or log in to access the full features of the platform.
4. Job Seekers can browse available jobs, search for specific positions, and apply to job openings.

## <span style="color:#3498db">Dependencies</span>

- Express
- EJS
- Express Sessions
- Express Validator
- Multer
- Nodemailer

## <span style="color:#3498db">Extra Features Added By Me</span>

1. **Job Ownership Identification**:

   - When the recruiter logs in, in the jobs section, they will see their jobs labeled as "Your Posting" for easy identification.

2. **Applicant Model**:

   - All applicants for various jobs are stored with their name, number, email, and resume by creating a separate Applicant Model.

3. **Pagination**:

   - Implemented pagination for both all jobs and filtered jobs to improve performance and user experience.

4. **Recruiter Privileges**:

   - Only recruiters can post new jobs, ensuring that job postings are authentic and relevant.

5. **Job Update and Deletion**:

   - Only the recruiter who posted the job can update or delete it, ensuring data integrity and security.

6. **Applicant Privacy**:

   - Only the recruiter who posted the job can see all the applicants for that job, ensuring applicant privacy.

7. **Prevent Self-Application**:

   - The recruiter cannot apply for their own job, preventing conflicts of interest.

8. **Prevent Duplicate Applications**:

   - If a user has applied for a job once, they cannot apply for it again. This is done by cross-checking the applicant's email and contact with the applicants who have already applied for the job.

9. **Email Authentication**:

   - Due to the absence of a database, email has been used in most places for precise authentication, ensuring security and user verification.

10. **404 Pages**:

    - Custom 404 Pages are implemented for scenarios like accessing a non-existent job or trying to update a job that the recruiter did not post.

11. **Custom Confirmation Emails**:

    - A custom email is sent to every applicant, including the company name and job designation. It also sends the applicant's resume back to them as an attachment as a confirmation of their application.

12. **User Registration Middleware**:

    - During registration, the `checkUserExists` middleware checks if the user already exists. If so, they are prompted to log in instead, improving the user experience.

13. **Registration Validation**:

    - New user registration requires proper details such as an 8-character password, validated by the `registrationValidateRequest` middleware before registration.

14. **Login Prompt for Unregistered Users**:

    - If an unregistered user tries to log in, they are shown an error message prompting them to register first.

15. **Validation Middleware**:

    - Validation middlewares are implemented for every form submission, displaying errors to users for accurate data input and enhancing data integrity.

16. **OTP Verification for Email**:
    - Added an OTP verification step for email addresses during the application process to avoid bot applications, ensuring only genuine applicants apply for job postings.

## <span style="color:#3498db">Required Features as per Problem Statement</span>

1. **MVC Architecture**:

   - Implemented using Express.js:
     - **Models:** Defined in separate files for users and jobs, handling data operations using in-memory data structures.
     - **Views:** Utilized EJS templates for rendering dynamic HTML based on server data.
     - **Controllers:** Implemented controllers to handle routing, request processing, and interaction with models and views.

2. **EJS Templating**:

   - Used throughout the application to render dynamic HTML pages, such as job listings, job details, login/register forms, etc.

3. **ES6 Modules**:

   - Organized project files into separate modules for better code organization and modularity, enhancing maintainability and scalability.

4. **Express Sessions**:

   - Managed user sessions using `express-session` middleware, storing session data on the server and enabling cookie-based tracking of the last visit.

5. **In-Memory Data Structures**:

   - Used JavaScript objects to store user and job data temporarily in memory, facilitating efficient data manipulation and retrieval.

6. **Login and Registration System**:

   - Implemented login and registration functionality in separate routes and controllers, validating user credentials and storing user information securely.

7. **Job Listings for Job Seekers**:

   - Implemented routes and controllers to fetch and display all available jobs, providing essential details such as job title, company name, location, and salary.

8. **Job Management for Recruiters**:

   - Created routes and controllers to handle CRUD operations for job postings, including validation for each field in the job posting form.

9. **Applicant Management**:

   - Developed routes and controllers to manage job applicants, allowing recruiters to view all applicants of a job, including their submitted resume files.

10. **Email Notifications**:

    - Integrated nodemailer to send confirmation emails to applicants after they apply to a job, enhancing communication and user experience.

11. **Middleware Usage**:

    - Utilized middleware functions for authentication, last visit tracking, file upload processing, and sending confirmation emails, enhancing application functionality and performance.

12. **File Upload Middleware**:

    - Implemented multer middleware to handle file uploads securely, storing resume files on the server and ensuring proper file handling.

13. **Comprehensive Documentation**:

    - Ensured detailed documentation for each module, function, and route, providing clear explanations and usage instructions for developers.

## <span style="color:#3498db">Required Additional Features as per Problem Statement</span>

1. **Job Search Functionality**:

   - Implemented a search input in the navbar to allow users to filter jobs based on keywords, job titles, or company names, enhancing user experience and job discovery.

2. **Redirect Recruiters**:

   - Redirected recruiters to the all jobs page if they are already logged in, preventing them from accessing the login/register options again and improving user flow.

3. **Resource-Based Authorization**:

   - Implemented authorization checks to ensure that only the recruiter who posted a job can update or delete it, enhancing security and data integrity.

4. **Display Last Visit Date**:

   - Displayed the user's last visit date and time on the frontend to provide personalized information, enhancing user experience and engagement.

5. **Confirmation Dialogs**:

   - Added confirmation dialogs for update and delete operations to prevent accidental modifications, providing a safety net for users and improving user trust.

6. **Common Validation Middleware**:

   - Implemented a common validation middleware to validate form inputs consistently across the application, ensuring data integrity and adherence to validation rules.

7. **Pagination**:

   - Implemented pagination for job listings and applicant lists to improve performance, enhancing scalability and user experience by reducing load times and optimizing resource usage.

## <span style="color:#3498db">Project Structure</span>

- **Controllers**

  - `user.controller.js`: Handles user authentication (login, registration, logout).
  - `job.controller.js`: Manages job-related operations such as listing, creation, update, and deletion.
  - `applicant.controller.js`: Handles applicant-related operations for recruiters.

- **Models**

  - `user.model.js`: Defines the User model for storing user data.
  - `job.model.js`: Defines the Job model for storing job postings and applicant details.
  - `applicant.model.js`: Defines the Applicant model for storing applicant details.

- **Views**

  - Contains EJS templates for rendering HTML pages dynamically.

- **Middleware**

  - `auth.middleware.js`: Middleware that checks if the user is logged in, specifically if the user is a recruiter.
  - `applicationValidation.middleware.js`: Middleware to validate the form data for applying for a job.
  - `checkUserExists.middleware.js`: Middleware to check if the user already exists during registration.
  - `fileUpload.middleware.js`: Middleware for handling file uploads using Multer.
  - `jobCreateValidation.middleware.js`: Middleware to validate the form data for creating a new job.
  - `jobUpdateValidation.middleware.js`: Middleware to validate the form data for updating a job.
  - `lastVisit.middleware.js`: Middleware to track the user's last visit date and time.
  - `loginValidation.middleware.js`: Middleware to validate the form data for user login.
  - `registrationValidation.middleware.js`: Middleware to validate the form data for user registration.

- **Public (Contains static assets)**

  - `css`: Contains CSS files for styling the application.
  - `images`: Contains images used in the application.
  - `js`: Contains JavaScript files for client-side functionality.
  - `uploads`: Contains uploaded resume files.

## <span style="color:#3498db">Contributors</

span>

- Dev Reddy

## <span style="color:#3498db">License</span>

ISC
