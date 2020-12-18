const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");
const CryptoJS = require("crypto-js");

sgMail.setApiKey(functions.config().sendgrid.key);

exports.funcSendEmail = functions.https.onCall(async (data, context) => {
    console.log(context.auth.uid);
    let bytes  = CryptoJS.AES.decrypt(data, context.auth.uid);
    console.log('bytes', bytes);
    let decryptedData = JSON.parse(JSON.stringify(CryptoJS.enc.Utf8.stringify(bytes)));
    console.log('decrypted data', decryptedData)
    console.log('json string decrypted', JSON.stringify(decryptedData));
    messageObj = JSON.parse(decryptedData);
    console.log('message obj', messageObj);
    const message = {
        to: messageObj.to,
        from: messageObj.from,
        subject: messageObj.subject,
        text: messageObj.content,
        // html: messageObj.textContent
    };
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
