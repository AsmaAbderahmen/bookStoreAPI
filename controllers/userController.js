
const bcrypt = require('bcrypt');
const User = require('../models/usersModel');

let hash_password = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash)
            });
        });
    });
};

exports.checkUserExistance = async function (req, res, next) {
    let email = req.body.email;
    try {
        if(!email){        
                return res.status(400).json({ status: 400, message: 'lack of body informations'})
    }else{
        let data = await User.findOne({ email: email });
        if (data) {
            return res.status(200).json({ status: 200, message: 'user already exists', data: { exist: true } })
        } else {
            return res.status(200).json({ status: 200, message: 'user do not exists', data: { exist: false } })
        }}
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' });
    }
};

exports.userCreation = async (req, res, next) =>{
    /*
    * body:{
    *      username: string
    *      email: string
    *      password: string
    * }
    */

    let body = req.body;
    try {
        if (!body.email || !body.password || !body.username) {
            res.status(400).json({ status: 400, message: 'lack of information in body'});
        } else {
            body['password'] = await hash_password(body.password);
            const new_user = new User(body);
            const user_data = await User.create(new_user);
            if (user_data) {
                return res.status(201).json({ status: 201, message: 'new user ctreated', data: { _id: user_data._id, username: user_data.username, email: user_data.email } });
            } else
                res.status(409).json({ status: 409, message: 'user is not created' });
        }

    } catch (error) {
        console.log('error', error.message)
        return res.status(500).json({ status: 500, message: 'server error' })
    }
};