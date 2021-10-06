const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");
const CryptoJS = require("crypto-js");
const {getUser} = require("../common/accessUtils")

sgMail.setApiKey(functions.config().sendgrid ? functions.config().sendgrid.key : "");

exports.funcSendEmail = functions.https.onCall(async (data, context) => {
    console.log(context.auth.uid);
    let bytes  = CryptoJS.AES.decrypt(data, context.auth.uid);
    const userData = await getUser(context.auth.uid)
    const email = docData.email;
    // console.log('bytes', bytes);
    let decryptedData = JSON.parse(JSON.stringify(CryptoJS.enc.Utf8.stringify(bytes)));
    // console.log('decrypted data', decryptedData)
    console.log('json string decrypted', JSON.stringify(decryptedData));
    let messageObj = JSON.parse(decryptedData);
    console.log('message obj', messageObj);
    const message = {
      to: messageObj.to,
      replyTo: email,
      cc: email,
      from: messageObj.from,
      subject: messageObj.subject,
      text: messageObj.content,
    };
    if (messageObj.attachments) {
      message.attachments = messageObj.attachments;
    }
    console.log('message', message);

    return sgMail.send(message)
        .then(() => {
            messageObj.delivered = true;
            // add to sent emails list
            return '200';
        })
        .catch((err) => {
            console.log(JSON.stringify(err));
            // add to draft emails list
            return err;
        });
});
