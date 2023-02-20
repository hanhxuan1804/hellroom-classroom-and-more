const niv = require('../../public/Validator');
const Validator = niv.Validator;
const User = require('../../mongooseModel/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email|minLength:4|maxLength:100|unique:User,email',
        password: 'required|minLength:6|maxLength:100',
        firstName: 'required|minLength:2|maxLength:100',
        lastName: 'required|minLength:2|maxLength:100',
    });
    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }
try{
    const userObject = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    let user = await userObject.save();

    return res.status(201).json({
        message: 'Successfully'
    });
}catch(err){
    return res.status(400).send({
        message: err.message,
        data: err,
    });
}
}

exports.login = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email|minLength:4|maxLength:100',
        password: 'required|minLength:6|maxLength:100',
    });
    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).send({
                message: 'Email or password is incorrect',
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).send({
                message: 'Email or password is incorrect',
            });
        }
        user.password = undefined;
        const token = jwt.sign({user: user}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.status(200).send({
            token: token,
            user: user,
        });
    }catch(err){
        return res.status(400).send({
            message: err.message,
            data: err,
        });
    }
}

exports.profile = (req, res) => {
    let user = req.user;
    user.password = undefined;
    return res.status(200).send({
        user: user,
    });
}
