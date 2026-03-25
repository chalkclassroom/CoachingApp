const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");
const {getUser} = require("../common/accessUtils");

sgMail.setApiKey(functions.config().sendgrid ? functions.config().sendgrid.key : "");

const HELP_RECIPIENT = "contact@chalkcoaching.com";
const SENDER_ADDRESS = "chalkcoaching@gmail.com";

exports.funcSendHelpRequest = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "User must be logged in to submit a help request."
        );
    }

    const {message} = data;
    if (!message || message.trim().length === 0) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Message is required."
        );
    }

    const userData = await getUser(context.auth.uid);
    const userName = `${userData.firstName} ${userData.lastName}`;
    const userEmail = userData.email;
    const userRole = userData.role;

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
            return {success: true};
        })
        .catch((err) => {
            console.error("Error sending help request:", JSON.stringify(err));
            throw new functions.https.HttpsError(
                "internal",
                "Failed to send help request. Please try again."
            );
        });
});
