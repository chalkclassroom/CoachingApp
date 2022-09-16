const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid ? functions.config().sendgrid.key : "");

exports.funcSendMLE = (item) => {
    const message = {
      to: 'contact@chalkcoaching.com',
      replyTo: 'chalkcoaching@gmail.com',
      cc: 'chalkcoaching@gmail.com',
      from: 'chalkcoaching@gmail.com',
      subject: 'New Mailing List Member!',
      text: `Email: ${item} has just signed up for the mailing list!\nSent from CHALK Coaching`
    }

    return sgMail.send(message)
        .then(() => {
          console.log("Email Sent");
          return '200';
        })
        .catch((err) => {
          console.error('Error: ', error);
          return err;
        });
  }