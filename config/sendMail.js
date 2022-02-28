const nodemailer = require('nodemailer')
const sendMail = async(email, subject, text) =>{
    try{
        const transporter =  nodemailer.createTransport({ 
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        // var mainOptions = { 
        //     from: process.env.USER,
        //     to: email,
        //     subject:  subject,
        //     text: text,
        // }
        // transporter.sendMail(mainOptions, function(err, info){
        //     if (err) {
        //         console.log(err);
        //         res.redirect('/login');
        //     } else {
        //         console.log('Message sent: ' +  info.response);
        //         res.redirect('/change');
        //     }
        // });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
    
}
module.exports = sendMail;