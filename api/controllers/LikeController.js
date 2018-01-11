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
 /*   SearchCenter: (req,res) => {
    	CenterService.SearchCenter(req, res);
    },
    DisplayCenter: (req,res) => {
    	CenterService.DisplayCenter(req, res);
    },
    ContactCenter: (req,res) => {
        CenterService.ContactCenter(req, res);
    }*/
    
};