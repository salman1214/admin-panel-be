const router = require('express').Router();
const { isLoggedIn } = require('../middleware/auth');

router.use('/auth', require('./auth'));
router.use('/users', isLoggedIn, require('./users'));
router.use('/appointments', isLoggedIn, require('./appointments'));
router.use('/treatments', isLoggedIn, require('./treatments'));
router.use('/dashboard', isLoggedIn, require('./dashboard'));

module.exports = router;
