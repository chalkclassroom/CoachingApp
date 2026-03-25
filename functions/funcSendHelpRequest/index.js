const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid ? functions.config().sendgrid.key : "");

const HELP_RECIPIENT = "contact@chalkcoaching.com";
const SENDER_ADDRESS = "chalkcoaching@gmail.com";

exports.funcSendHelpRequest = functions.firestore
    .document("helpRequests/{requestId}")
    .onCreate(async (snap) => {
        const data = snap.data();
        const {message, userName, userEmail, userRole} = data;

        if (!message || message.trim().length === 0) {
            console.error("Empty help request message");
            return snap.ref.update({status: "error", error: "Empty message"});
        }

        const emailMessage = {
            to: HELP_RECIPIENT,
            replyTo: userEmail,
            from: SENDER_ADDRESS,
            subject: `CHALK Help Request from ${userName}`,
            text: [
                `Help request from: ${userName}`,
                `Email: ${userEmail}`,
                `Role: ${userRole}`,
                ``,
                `Message:`,
                message,
                ``,
                `---`,
                `Sent from CHALK Coaching`
            ].join("\n")
        };

        return sgMail.send(emailMessage)
            .then(() => {
                console.log("Help request email sent");
                return snap.ref.update({status: "sent"});
            })
            .catch((err) => {
                console.error("Error sending help request:", JSON.stringify(err));
                return snap.ref.update({status: "error", error: err.message});
            });
    });
