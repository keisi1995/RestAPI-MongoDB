const router = require('express').Router();

const { validateLogin } = require('../http/validator/user');
const Auth = require('../http/controller/authenticateController');

router.route('/')
    .post(validateLogin, Auth.login)

module.exports = router;
