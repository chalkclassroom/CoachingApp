const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid ? functions.config().sendgrid.key : "");

exports.funcSendMLE = (item) => {
    const message = {
      to: 'contacts@chalkcoaching.com',
      from: 'chalkcoaching@gmail.com',
      subject: 'New Mailing List Member!',
      html: `<p><strong>Email:</strong> ${item}, just joined the mailing list!</p>
      <p>Sent from Chalk Coaching</p>`
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