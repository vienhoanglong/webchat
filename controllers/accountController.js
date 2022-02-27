const User = require('../models/user')
const passwordHash = require('password-hash')
const {validationResult} = require('express-validator')
const sendMail = require('../config/sendMail')
//getIndex
const getIndex = async (req, res)=>{
    // let id = req.session.passport.user
    // let user = await User.findById(id)
    // res.cookie('idGmail',id,{ maxAge: 900000, httpOnly: true });
    // // console.log(user)
    // // console.log("cookie",req.cookies.idGmail)
    res.render('index');
}
const getLogin = (req, res) =>{
    res.render('login')
}
const postLogin = async (req, res) =>{
    if ('signup' === req.body.typeForm) {
        let result = validationResult(req)
        if(result.errors.length === 0) {
            const{fullname, username, email, password} = req.body
            let hashedPassword = passwordHash.generate(password); 
            try{
                const user = await User.create({fullname, username, email, password: hashedPassword})
                return res.status(201).json({success: true, message:'Tạo tài khoản thành công', account: user})
            }
            catch(err){
                return res.status(400).json({err})
            }
        }else{
            result = result.mapped();
            let errSignUp 
            for(fields in result){
                errSignUp = result[fields].msg
                break
            }
            return res.json({success: false, message: errSignUp});
        }
    } 
    if('signin' === req.body.typeForm) {
        let result = validationResult(req);
        if(result.errors.length === 0) {
            const{username, password} = req.body
            const user = await User.findOne({username: username})
            if(user){
                if(passwordHash.verify(password, user.password)){
                    // Save
                    res.cookie('username',username,{ maxAge: 900000, httpOnly: true });
					res.cookie('fullname', user.fullname,{ maxAge: 900000, httpOnly: true });
                    return res.json({success: true, message: 'Đăng nhập thành công'})
                }
                else{
                    return res.json({success: false, message: 'Mật khẩu không chính xác'});
                }
            }else{
                return res.json({success: false, message: 'Tài khoản không tồn tại'});
            }
        }
        else{
            result = result.mapped();
            let errSignIn;
            for(fields in result){
                errSignIn = result[fields].msg;
                break;
            }
            return res.json({success: false, message: errSignIn}); 
        }
    }
}
const postForgot = async(req, res) =>{
    await sendMail('vienhoanglong789@gmail.com', 'Test', 'Test')
    
}
module.exports ={
    getIndex,
    getLogin,
    postLogin,
    postForgot
}
