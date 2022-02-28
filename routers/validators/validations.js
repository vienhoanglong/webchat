const {check} = require('express-validator')

let signInValidator = [
        check('username').exists().withMessage('Vui lòng nhập username').notEmpty().withMessage('Username không được để trống'),
        check('password').exists().withMessage('Vui lòng nhập mật khẩu')
	.notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải từ 6 kí tự trở lên'),
]

let signUpValidator =[
        check('fullname').exists().withMessage('Vui lòng nhập tên đầy đủ')
	.notEmpty().withMessage('Tên không được để trống'),

        check('username').exists().withMessage('Vui lòng nhập username')
        .notEmpty().withMessage('Username không được để trống'),

        check('email').exists().withMessage('Vui lòng nhập email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),

        check('password').exists().withMessage('Vui lòng nhập mật khẩu')
	.notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải từ 6 kí tự trở lên')
]

let forgotPasswordValidator = [
        check('email_forgot').exists().withMessage('Vui lòng nhập email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ')
]
module.exports = {
    signUpValidator,
    signInValidator,
    forgotPasswordValidator
}
