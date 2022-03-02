const User = require('../models/user')
const Token = require('../models/token')
const passwordHash = require('password-hash')
const {validationResult} = require('express-validator')
const sendMail = require('../config/sendMail')
const crypto = require("crypto")
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
        let result = validationResult(req)
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
const getForgot = async(req, res) => {
    let msgForgot = req.flash('msgForgot') || '' 
    let msgSuccess = req.flash('msgSuccess') || ''
    res.render('forgotPassword',{msgForgot, msgSuccess})
}
const postForgot = async(req, res) =>{
    let result = validationResult(req)
    if(result.errors.length === 0){
        const {email_forgot} = req.body
        // Check email in db
        const user = await User.findOne({email:email_forgot})
        if(!user){
            req.flash('msgForgot', 'Email không tồn tại')
            res.redirect('/forgot')
        }
        // check token
        let token = await Token.findOne({userId: user._id})
        if(!token){
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        // create link
        const link = `${process.env.BASE_URL}/change/${user._id}/${token.token}`
        // Send mail and link reset password
        await sendMail(user.email,'Forgot password', link)
        req.flash('msgSuccess','Yêu cầu đã gửi qua email của bạn')
        res.redirect('/forgot')
    }else{
        result = result.mapped();
        let msg;
		for(fields in result){
			msg = result[fields].msg
			break
		}
		req.flash('msgForgot',msg)
        res.redirect('/forgot')
    }
}
const getChange = async(req, res) =>{
    let msgChange = req.flash('msgChange') || ''
    let msgChangeSuccess = req.flash('msgChangeSuccess') || ''
    res.render('changePassword',{msgChange,msgChangeSuccess})
}
const postChange = async(req, res) =>{
    let result = validationResult(req)
    const userId = req.params.userId
    const userToken = req.params.token
    if(result.errors.length === 0){
        const {newpassword, reapeatpassword} = req.body
        const user = await User.findById(userId)
        if(!user){
            req.flash('msgChange','Liên kế không phù hợp hoặc đã hết hạn')
            res.redirect(`/change/${userId}/${userToken}`)
        }
        const token = await Token.findOne({
            userId: user._id,
            token: userToken
        })
        if(!token){
            req.flash('msgChange','Liên kế không phù hợp hoặc đã hết hạn')
            res.redirect(`/change/${userId}/${userToken}`)
        }
        //Update password for user
        if(newpassword === reapeatpassword){
            let hashedPassword = passwordHash.generate(newpassword);
            user.password = hashedPassword
            await user.save();
            await token.delete();
            req.flash('msgChangeSuccess','Đã reset mật khẩu mới thành công')
            res.redirect(`/change/${userId}/${userToken}`)

        }else{
            req.flash('msgChange','Mật khẩu không khớp')
            res.redirect(`/change/${userId}/${userToken}`)
        }
    }else{
        result = result.mapped();
        let msg;
		for(fields in result){
			msg = result[fields].msg
			break
		}
		req.flash('msgChange',msg)
        res.redirect(`/change/${userId}/${userToken}`)
    }
}
module.exports = {
    getIndex,
    getLogin,
    postLogin,
    getForgot,
    postForgot,
    getChange,
    postChange
}

