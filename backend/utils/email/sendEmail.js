const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { EMAIL_PASSWORD, EMAIL_USER, EMAIL_HOST } = require('../config')
const sendEmail = async (email, subject, payload, template) => {
  let emailHost = EMAIL_HOST
  let emailUsername = EMAIL_USER
  let emailPassword = EMAIL_PASSWORD


  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: 465,
      auth: {
        user: emailUsername,
        pass: emailPassword, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    console.log('the source is ', source)
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: emailHost,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error)
        return error;
      } else {
        console.log('success')
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error)
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = {sendEmail};