/**
 * UsersController
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing users
 */


//import RegisterService from '../services/RegisterService';
import RegisterService from '../services/RegisterService';
module.exports = {

    register: (req, res) => {
        RegisterService.register(req, res);
    },
    login: (req, res) => {
        RegisterService.login(req, res);
    },
    updateUser: (req,res) => {
    	RegisterService.updateUser(req, res);
    },
    forgotPassword: (req,res) => {
    	RegisterService.forgotPassword(req, res);
    },
    resetPassword : (req,res) => {
    	RegisterService.resetPassword(req, res);
    }
};