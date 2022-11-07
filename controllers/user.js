    //-----------JWT
    const JWT_SECRET = 'Heremycode322247-372961....Enjoy!!!'
    const jwt = require('jsonwebtoken')
    var AccountModel = require('../models/account')
    class userController {
        login_get(req, res) {
            res.render('Login/login')
        }
        register_get(req, res) {
            res.render('Login/register')
        }

        //--------------FORGOT----------------//
        forgot_get(req, res) { res.render('Login/forgot-password') };
        async forgot_post(req, res) {
                const { email } = req.body
                const { password } = req.body
                    //res.send(email)
                let UserEmail = await AccountModel.findOne({ email })
                let UserID = await AccountModel.findById('6367ca98d840d1daec4ab049')

                let Userpass = AccountModel.findOne(password)
                if (!UserEmail) {
                    res.send('User not registered')
                    return;
                }
                const secret = JWT_SECRET + Userpass.password
                const payload = {
                    email: UserEmail.email,
                    _id: UserID._id
                }
                const token = jwt.sign(payload, secret, { expiresIn: '5m' })
                const link = `http://localhost:3000/signup/reset-password/${UserID._id}/${token}`
                console.log(link);
                res.send('Mã reset mật khẩu đã được gửi vào email...')
            }
            //--------------FORGOT----------------//
        reset_get(req, res) {
                const { id, token } = req.params;
                res.send(req.params)
            }
            //--------------RESET----------------//
        reset_post(req, res, next) {
                res.render('Login/reset-password')
            }
            //--------------RESET----------------//
        login_post(req, res) {
            var username = req.body.username
            var password = req.body.password


            console.log(username);
            console.log(password);

            AccountModel.findOne({
                username: username,
                password: password
            }).then(data => {

                res.json({ message: "Login Complete!" })

            }).catch(data => {
                res.status(300).json("Wrong")
            })
        }

        register_post(req, res, next) {
            var username = req.body.username
            var email = req.body.email
            var password = req.body.password


            console.log(username);
            console.log(password);
            res.json({ message: " ^^! " })
            AccountModel.findOne({
                    username: username
                })
                .then(data => {
                    if (data) {
                        res.json('Username đã tồn tại')
                    } else {
                        return AccountModel.create({
                            username: username,
                            email: email,
                            password: password
                        })
                    }
                })
                .then(data => {
                    console.log("Complete");
                }).catch(Error => {
                    res.status(500).json('Tạo tài khoản thất bại')
                })
        }


    }
    module.exports = new userController;