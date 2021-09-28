const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const emailing = require('../middlewares/emailing.js');
const templates = require('../public/forget_password_template');

//get the envirement variables
const dotenv = require('dotenv');
require("dotenv/config.js");
dotenv.config();

const token_nbf = process.env.TOKEN_NBF || 500;
const token_life = process.env.TOKEN_LIFE || '1h';
const refresh_token_life = process.env.REFRESH_LIFE || '1d';
const token_key = process.env.TOKEN_SECRET_KEY;
const refresh_token_key = process.env.REFRESH_SECRET_KEY;

let hash_password = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash)
            });
        });
    });
};

function generate_codes() {
    let code = "";
    do {
        code += crypto.randomBytes(3).readUIntBE(0, 3);
        // code += Number.parseInt(randomBytes(3).toString("hex"), 16);
    } while (code.length < 5);

    return code.slice(0, 5);
}

let generate_token = async (data) => {
    /*
     * data:{
     *    _id: user's object id,
     *    email: users's email,
     *   }
     */
    let token = jwt.sign({
        _id: data._id,
        email: data.email,
        nbf: Number(token_nbf),
        auth: "authorization",
        sub: data._id,
        algorithm: "RS256"
    },
        token_key.toString(),
        { expiresIn: token_life });

    return token

};


let refresh_token_function = async (data) => {
    /*
     * data:{
     *    _id: user's object id,
     *    email: users's email,
     *   }
     */
    let today = new Date();
    let refresh_token = jwt.sign({
        _id: data._id,
        email: data.email,
        nbf: Number(token_nbf),
        auth: "authorization",
        sub: data._id,
        algorithm: "RS256"
    },
        refresh_token_key.toString(), {
        expiresIn: refresh_token_life
    });
    return refresh_token
};


exports.refresh_token = async (req, res, next) => {
    /*
      body:{
           refresh_token: we will test if the refresh token is valid or it will be ignored
          }
    */

    let body = req.body;
    try {
        let refresh_token = body.refresh_token;
        if (!refresh_token) {
            return res.status(400).json({ status: 400, message: 'no refresh token on the body' });

        } else {
            await jwt.verify(refresh_token, refresh_token_key, async (err, decoded) => {
                if (err) {
                    return res.status(401).send({ status: 401, message: "user refresh token is expired" });
                } else {
                    const user_data = decoded;
                    const token_data = {
                        _id: user_data._id,
                        email: user_data.email,
                    };
                    const token = await generate_token(token_data);

                    res.status(200).json({ status: 200, message: 'new token generated', data: { token: token } })
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' });
    }
};

exports.signin = async function (req, res, next) {
    let body = req.body;
    try {
        if (!body.email || !body.password) {
            return res.status(400).json({ status: 400, message: 'lack of credentiels' });

        } else {
            let user_info = await User.findOne({ email: body.email });
            if (!user_info)
                return res.status(406).json({ status: 406, message: 'wrong credentials' });
            else {
                try {
                    await bcrypt.compare(body.password, user_info.password, async (err, result) => {
                        if (result) {

                            let token_data = {
                                _id: user_info._id,
                                email: user_info.email
                            };
                            let token = await generate_token(token_data);
                            let refresh_token = await refresh_token_function(token_data);
                            let result_object = {
                                user: { _id: user_info._id, username: user_info.username, email: user_info.email },
                                token: token,
                                refresh_token: refresh_token
                            };
                            return res.status(200).json({ status: 200, message: 'success', data: result_object });
                        } else {
                            return res.status(406).json({ status: 406, message: 'wrong credentials' });
                        }
                    });
                } catch (error) {

                    return res.status(500).json({ status: 500, message: 'server error' })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' })
    }
};

/* verify_old_password id used before password changing to verify if the old passsword is correct*/
exports.verify_old_password = async (req, res, next) => {
    const body = req.body;
    try {
        if (!body.password) {
            return res.status(400).json({ status: 400, message: "no password in the body" });
        } else {
            let user_data = await User.findOne({ email: body.email }, 'password');
            let password = user_data.password;
            await bcrypt.compare(body.password, password, (err, result) => {
                if (result)
                    return res.status(409).json({ status: 409, message: "wrong old password" });
                else
                    return res.status(200).json({ status: 200, message: "correct old password" });
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, message: "server error" });
    }
};

exports.change_password = async (req, res, next) => {
    const _id = req.user_data._id;
    const new_password = req.body.new_password;
    const old_password = req.body.old_password;
    try {
        if (!new_password || !old_password) {
            return res.status(400).json({ status: 400, message: "lack of informations in the body" });
        } else {
            let user_data = await User.findById(_id);
            await bcrypt.compare(old_password, user_data.password, async (err, result) => {
                if (result) {
                    if (old_password == new_password) {
                        return res.status(409).json({ status: 406, message: "using same old password" });
                    } else {
                        await User.updateOne({ _id: _id }, { password: await hash_password(new_password) });
                        return res.status(200).json({ status: 200, message: "updated" })
                    }
                } else {
                    return res.status(406).json({ status: 406, message: "wrong old password" });
                }
            });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, message: "server error" });
    }
};


exports.forget_password_send_email = async (req, res, next) => {

    const body = req.body;
    const random = await generate_codes();
    try {
        if (!body.email) {
            res.status(400).json({ status: 400, message: 'no email in the body' })

        } else {
            let verif_obj = {
                email: body.email.toLowerCase()
            };
            let user_data = await User.findOne(verif_obj);

            if (user_data) {
                await User.updateOne({ _id: user_data._id }, {
                    password_recovering: {
                        expiration_date: new Date().getTime() + (5 * 60000), //the code will be availble for 5 min
                        code: random
                    }
                });

                await emailing.send_mail({
                    email: body.email,
                    subject: 'Password Recovering',
                    html: await templates.forget_password_email_template({ username: user_data.username, code: random })
                });
                res.status(200).json({ status: 200, message: 'email sent' })

            } else {
                res.status(406).json({ status: 406, message: 'wrong credentials' })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'server error' })
    }
};

exports.forget_password_verify_code = async (req, res, next) => {
    const body = req.body;
    const today = new Date();
    try {
        if (!body.email || !body.code) {
            res.status(400).json({ status: 400, message: 'missing data from the body' })
        } else {
            let user_data = await User.findOne({ email: body.email.toLowerCase() });
            if (user_data) {
                let expiration_time = user_data.password_recovering.expiration_date.getTime();
                if (expiration_time >= today.getTime()) {
                    if (user_data.password_recovering.code == body.code) {
                        res.status(200).json({ status: 200, message: 'valid code' });
                    } else {
                        res.status(408).json({ status: 408, message: 'wrong code' })
                    }
                } else {
                    res.status(409).json({ status: 409, message: 'expired code' })
                }
            } else {
                res.status(406).json({ status: 406, message: 'user not found' })
            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: 'server error' })
    }
};

exports.change_password_on_recovering = async function (req, res, next) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    try {
        if (!email || !password) {
            return res.status(400).json({ status: 400, message: 'lack of data on the body' });
        } else {
            let user = await User.findOne({ email: email });
            if (user) {
                await User.updateOne({ email: email }, { password: await hash_password(password) });
                return res.status(200).json({ status: 200, message: 'password updated' })
            } else {
                return res.status(406).json({ status: 406, message: 'user not found' });
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' });
    }
};




