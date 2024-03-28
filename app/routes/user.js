const router = require('express').Router();

const { validateStore } = require('../http/validator/user');
const authMiddleware = require('../http/middleware/authMiddleware');
const User = require('../http/controller/userController');

router.route('/')
    .get(authMiddleware, User.index)
    .post(validateStore, User.store)

router.route('/:id_user')
    .get(authMiddleware, User.show)
    .put(authMiddleware, validateStore, User.update)
    .delete(authMiddleware, User.destroy)

module.exports = router;
