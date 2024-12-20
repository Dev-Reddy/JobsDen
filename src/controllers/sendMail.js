//Desc: This file contains the function for sending emails to the applicants who have applied for a job

//Importing nodemailer to send emails to the applicants and path to get the path of the resume file uploaded by the applicant
import nodemailer from "nodemailer";
import path from "path";

//Send an email to the applicant after applying for a job

export async function sendApplyEmail(job, applicant) {
  // --------------------------------------------------------
  //Gather the details of the applicant and the resume file

  //get the email of the applicant
  const email = applicant.email;

  //get the path of the resume file uploaded by the applicant
  const resumePath = path.join(
    path.resolve() + "/public/" + applicant.resumePath
  );

  //get the name of the resume file
  //8 characters in /public/
  //15 characters in date and time
  const resumeName = applicant.resumePath.substring(
    8 + applicant.name.length + 15
  );

  // --------------------------------------------------------

  //Setting up the email to be sent to the applicant

  //create a transporter object using the default SMTP transport
  //using the gmail service to send the email

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thedevreddy@gmail.com",
      pass: "xajd zlwn mnoa hkvl",
    },
  });

  //send mail with defined transport object

  const mailOptions = {
    //sender's email
    from: "codingninjas2k16@gmail.com",

    //recipient's email
    to: email,

    //subject of the email
    subject: `Congratulations ${applicant.name}! You applied for ${job.jobdesignation} at ${job.companyname}!`,

    //text of the email
    text: `Congratulations ${applicant.name}! 
    You have successfully applied for the role of ${job.jobdesignation} at ${job.companyname}!
    Attached is your resume for reference. We will get back to you soon!`,

    //html content of the email
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                padding: 20px;
            }
            .container {
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
            }
            h1 {
                color: #4CAF50;
                font-size: 24px;
            }
            h3 {
                color: #555;
                font-size: 18px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Congratulations ${applicant.name}!!!</h1>
            <h3>You have successfully applied for the role of ${job.jobdesignation} at ${job.companyname}!</h3>
            <h3>Attached is your resume for reference. We will get back to you soon!</h3>
            <div class="footer">
                <p>Thank you for applying with us!</p>
            </div>
        </div>
    </body>
    </html>
    `,

    //attachments in the email
    //applicants resume is attached to the email for reference
    attachments: [
      {
        filename: resumeName, // Name of the attachment as it appears in the email
        path: resumePath, // Path to the resume file
      },
    ],
  };
  // --------------------------------------------------------

  //Send the email and catch errors if any

  //send the email
  try {
    //send the email and log the success message
    const result = await transporter.sendMail(mailOptions);
    console.log("Success: Email sent to " + email);
  } catch (error) {
    //catch any errors and log them
    console.log("Error: Email sent fail with error: " + error);
  }
}
