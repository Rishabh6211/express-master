import express from 'express';
import passport from 'passport';
const router = express.Router();
const oauth2 = require('../api/policies/OAuth2');
import RegisterController from '../api/controllers/RegisterController'

//file imports
import UsersController from '../api/controllers/UsersController';
var guard = passport.authenticate('bearer', { session: false });

//Users Routes
// router.get('/', UsersController.index);

router.get('/', function (req, res) {
    res.json({
    	msg: 'API is running'
    });
});

router.post('/token', oauth2.token);

router.get('/api/users/info',
(req, res) => {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    res.json({
        user_id: req.user.userId,
        name: req.user.username,
        scope: req.authInfo.scope
    });
});

router.post('/api/oauth/token', oauth2.token);
router.post('/register', RegisterController.register);

module.exports = router;