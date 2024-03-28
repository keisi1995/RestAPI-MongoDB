const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../../model/user');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');

class UsuarioController {    
    async login (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Validation Error!.', 500, myErrors);
            }
            
            const { email, password } = req.body;
            
            const user = await User.findOne({ email }).withPassword();
        
            if (!user)  { return error(res, 'User does not exist!.', 401); }
       
            const passwordValid = await user.comparePassword(password);
            if (!passwordValid) { return error(res, 'Invalid password!.', 401); }
            
            const { _id, first_name } = user;
            const token = jwt.sign({ _id, first_name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
            
            return success(res, 'Login success!.', 200, {'token': token});
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
}

module.exports = new UsuarioController()