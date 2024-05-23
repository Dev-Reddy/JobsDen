import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
  try {
    //to send email ->  firstly create a Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "thedevreddy@gmail.com",
        pass: "bvuyjufzjspbmhbz",
      },
    });

    //now Send e-mails to users
    let info = await transporter.sendMail({
      from: "codingninjas2k16@gmail.com",

      //recipient's email
      to: email,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Info is here: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

export default mailSender;
