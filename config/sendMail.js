const nodemailer = require('nodemailer')
const sendMail = async(email, subject, text) =>{
    const transporter =  nodemailer.createTransport({ 
        service: process.env.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
    var mainOptions = { 
        from: process.env.USER,
        to: email,
        subject:  subject,
        text: text,
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log("email not sent");
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
}
module.exports = sendMail;