const accountModels = require('../models/accounts')
const passwordHash = require('password-hash')
const {validationResult} = require('express-validator');
//getIndex
const getIndex = async (req, res)=>{
    res.render('index');
}
// getSignUp
const getSignUp = (req, res) =>{
    let errSignIn = 0;
    let errSignUp = req.flash('errSignUp') || '' ;
    console.log("signup",errSignUp)
    // if(req.cookies.idGmail || req.cookies.username){
    //     res.redirect("/")
    // }
    res.render('login',{errSignUp, errSignIn})
}
const getSignIn = async(req, res) =>{
    let errSignUp = 0;
    let errSignIn = req.flash('errSignIn') || '' ;
    console.log("Get sign in", errSignUp, errSignIn)
    res.render('login',{errSignIn, errSignUp})
}

const signUp = async(req, res) =>{
    let result = validationResult(req)
    if(result.errors.length === 0) {
        const{fullname, username, password} = req.body
        let hashedPassword = passwordHash.generate(password); 
        try{
            const account = await accountModels.create({fullname, username, password: hashedPassword})
            return res.status(201).json(account)
        }
        catch(err){
            res.status(400).json({ err })
        }
    }else{
        result = result.mapped();
		let errSignUp ;
		for(fields in result){
			errSignUp = result[fields].msg;
			break;
		}
		req.flash('errSignUp',errSignUp);
		res.redirect('/signup');
    }
}
const signIn = async(req, res) =>{
    let result = validationResult(req);
	if(result.errors.length === 0) {
        const{username, password} = req.body
        console.log("Usename",req.body.username)
        console.log("Password",req.body.password)
        const account = await accountModels.findOne({username: username})
        if(account){
            if(passwordHash.verify(password, account.password)){
                console.log('Dang nhap thanh cong')
                res.redirect('/index')
                return;
            }
            else{
                console.log('Mat khau khong chinh xac')
                res.redirect('/signin')
                return;
            }
        }else{
            console.log('Khong Co tai khoan')
            res.redirect('/signin')
            return;
        }
    }
    else{
        result = result.mapped();
		let errSignIn;
		for(fields in result){
			errSignIn = result[fields].msg;
			break;
		}
		req.flash('errSignIn', errSignIn);
		res.redirect('/signin');
    }

}
module.exports ={
    getIndex,
    signUp,
    signIn,
    getSignUp,
    getSignIn
}