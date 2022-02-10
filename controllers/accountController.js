const accountModels = require('../models/accounts')
const passwordHash = require('password-hash')
const {validationResult} = require('express-validator');
// getSignUp
const getSignUp = (req, res) =>{
    let error1 = 0;
    let error2 = req.flash('error2') || '' ;
    console.log("signup",error2)
    // if(req.cookies.idGmail || req.cookies.username){
    //     res.redirect("/")
    // }
    res.render('login',{error2, error1})
}
const getSignIn = (req, res) =>{
    let error2 = 0;
    let error1 = req.flash('error1') || '' ;
    console.log("sigin",error1)
    // if(req.cookies.idGmail || req.cookies.username){
    //     res.redirect("/")
    // }
    res.render('login',{error1, error2})
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
		let error2 ;
		for(fields in result){
			error2 = result[fields].msg;
			break;
		}

		req.flash('error2',error2);
		res.redirect('/signup');
    }
}
const signIn = async(req, res) =>{
    const{username, password} = req.body
    // console.log(req.body)
    let result = validationResult(req);
	if(result.errors.length === 0) {
        const account = await accountModels.findOne({username: username})
        if(account){
            if(passwordHash.verify(password, account.password)){
                    
                res.redirect('/index')
            }
            else{
                console.log('Mat khau khong chinh xac')
                res.redirect('/signin')
            }
        }else{
            console.log('Khong Co tai khoan')
            res.redirect('/signin')
        }
    }
    else{
        result = result.mapped();
		let error1;
		for(fields in result){
			error1 = result[fields].msg;
			break;
		}

		req.flash('error1',error1);
		res.redirect('/signin');
    }

}
module.exports ={
    signUp,
    signIn,
    getSignUp,
    getSignIn
}