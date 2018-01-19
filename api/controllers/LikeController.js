/**
 * CentersController
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing Centers
 */



import LikeService from '../services/LikeService';
module.exports = {

    profileLike: (req, res) => {
        LikeService.profileLike(req, res);
    },
    getLike: (req, res) => {
        LikeService.getLike(req, res);
    }
    
};