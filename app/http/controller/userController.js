const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../../model/user');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');

class UsuarioController {
    index = async (req, res) => {
        try {
            const users = await User.find();

            return success(res, 'ok!.', 200, users);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
    
    show = async (req, res) => {
        const { id_user } = req.params;
        try {
            const user = await User.findById(id_user);
            
            if (!user) { return error(res, 'The User does not exist!.', 404); }
            
            return success(res, 'ok!.', 200, user);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
    
    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Validation Error!.', 500, myErrors);
            }
            
            const { first_name, last_name, phone_number, email, password } = req.body;
            
            const existingUser = await User.find({email: email});            

            if(existingUser.length !== 0) { return error(res, 'The User does exist!.', 409); }

            const user = new User({ first_name, last_name, phone_number, email, password });
            const createdUser = await user.save();
    
            return success(res, 'Created successfully!.', 201, createdUser);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
       
    update = async (req, res) => {
        const { id_user } = req.params;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Validation Error!.', 500, myErrors);
            }
 
            const { first_name, last_name, phone_number, email, password } = req.body;
            
            const user = await User.findById(id_user);            
            
            if (!user) { return error(res, 'The User does not exist!.', 400); }

            const arrData = { first_name, last_name, phone_number, email, password };
            Object.assign(user, arrData);
            await user.save();

            return success(res, 'Updated successfully!.', 200, user);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
    
    destroy = async (req, res) => {
        const { id_user } = req.params;
        try {
            const user = await User.findByIdAndDelete(id_user);
            if (!user) { return error(res, 'The User does not exist!.', 404); }
            
            return success(res, 'Deleted successfully!.', 200);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
}

module.exports = new UsuarioController()