import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

const generateOtp = async (req, res) => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  return OTP;
};

export async function sendOTPEmail(job, email) {
  // --------------------------------------------------------
  console.log("otp");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thedevreddy@gmail.com",
      pass: "xajdzlwnmnoahkvl",
    },
  });

  const opt = await generateOtp();

  //send mail with defined transport object

  const mailOptions = {
    //sender's email
    from: "thedevreddy@gmail.com",

    //recipient's email
    to: email,

    //subject of the email
    subject: `OTP for ${job.jobdesignation} at ${job.companyname}!`,

    //text of the email
    text: `Your OTP is ${opt}`,

    //html body of the email
    html: `<h3>Your OTP is ${opt}</h3>`,
  };
  // --------------------------------------------------------

  //Send the email and catch errors if any

  //send the email
  try {
    //send the email and log the success message
    const result = await transporter.sendMail(mailOptions);
    console.log("Success: OTP Email sent to " + email);
  } catch (error) {
    //catch any errors and log them
    console.log("Error: Email sent fail with error: " + error);
  }

  return opt;
}
