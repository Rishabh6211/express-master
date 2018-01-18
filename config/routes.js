import express from 'express';
import passport from 'passport';
const router = express.Router();
const oauth2 = require('../api/policies/OAuth2');
import RegisterController from '../api/controllers/RegisterController'

//file imports
import UsersController from '../api/controllers/UsersController';
import StateController from '../api/controllers/StateController';
import CategoryController from '../api/controllers/CategoryController';
import CentersController from '../api/controllers/CentersController';
import TrainerController from '../api/controllers/TrainerController';
import LikeController from '../api/controllers/LikeController';
import ViewController from '../api/controllers/ViewController';
var guard = passport.authenticate('bearer', { session: false });

//Users Routes
// router.get('/', UsersController.index);


router.get('/users', function (req, res) {
    console.log("gaqgf")
    res.json([
    { id:1, "username":"Rishabh"  },
    { id:2, "username":"Rahul" }
    ]);
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

router.post('/api/oauth/login', oauth2.token);
router.post('/register', RegisterController.register);
router.get('/verify', RegisterController.verify);
router.put('/updateuser', RegisterController.updateUser);
router.put('/resetpassword', RegisterController.resetPassword);
router.post('/forgotpassword', RegisterController.forgotPassword);
router.post('/login', RegisterController.login);
router.get('/states', StateController.findStates);
router.get('/category', CategoryController.findCategory);
router.post('/savecenter', CentersController.SaveCenter);
router.post('/getcenter', CentersController.GetCenter);
router.get('/search', CentersController.SearchCenter);
router.get('/display', CentersController.DisplayCenter);
router.post('/image', CentersController.ImageUpload);
router.post('/contactcenter', CentersController.ContactCenter);
router.post('/profilelike', LikeController.profileLike);
router.get('/getLike/:centerId', LikeController.getLike);
router.post('/profileview', ViewController.profileView);
router.get('/', function (req, res) {
    res.json({
        msg: 'API is running'
    });
});
module.exports = router;