const accountModels = require('../models/accounts')
const passwordHash = require('password-hash')
const {validationResult} = require('express-validator');
//getIndex
const getIndex = async (req, res)=>{
    res.render('index');
}
const getLogin = (req, res) =>{
    res.render('login')
}
const postLogin = async (req, res) =>{
    if ('signup' === req.body.typeForm) {
        let result = validationResult(req)
        if(result.errors.length === 0) {
            const{fullname, username, password} = req.body
            let hashedPassword = passwordHash.generate(password); 
            try{
                const account = await accountModels.create({fullname, username, password: hashedPassword})
                return res.status(201).json({success: true, message:'Tạo tài khoản thành công', account: account})
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
            const account = await accountModels.findOne({username: username})
            if(account){
                if(passwordHash.verify(password, account.password)){
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
module.exports ={
    getIndex,
    getLogin,
    postLogin
}
