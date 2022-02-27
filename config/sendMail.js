const nodemailer = require('nodemailer')
const sendMail = async(email, subject, text) =>{
    try{
        var transporter =  nodemailer.createTransport({ 
            service: 'Gmail',
            auth: {
                user: 'vienlongdev@gmail.com',
                pass: 'asdasd@@'
            }
        });
        var mainOptions = { 
            from: 'vienlongdev@gmail.com',
            to: email,
            subject:  subject,
            text: text,
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log('Message sent: ' +  info.response);
                res.redirect('/');
            }
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
    
}
module.exports = sendMail;