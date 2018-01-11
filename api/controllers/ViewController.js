/**
 * CentersController
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing viewrs
 */



import ViewService from '../services/ViewService';
module.exports = {

    profileView: (req, res) => {
        ViewService.profileView(req, res);
    }
};