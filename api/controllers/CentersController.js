/**
 * CentersController
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing Centers
 */



import CenterService from '../services/CenterService';
module.exports = {

    SaveCenter: (req, res) => {
        CenterService.SaveCenter(req, res);
    },
    GetCenter: (req, res) => {
        CenterService.GetCenter(req, res);
    },
    SearchCenter: (req,res) => {
    	CenterService.SearchCenter(req, res);
    },
    DisplayCenter: (req,res) => {
    	CenterService.DisplayCenter(req, res);
    },
    ContactCenter: (req,res) => {
        CenterService.ContactCenter(req, res);
    },
    EditCenter : (req,res) => {
        CenterService.EditCenter(req, res);
    },
    DeleteCenter : (req,res) => {
        CenterService.DeleteCenter(req, res);
    },
    VerifyCenter : (req,res) => {
        CenterService.VerifyCenter(req, res);
    },
    getAllCenter : (req,res) => {
        CenterService.getAllCenter(req,res);
    }
    
    
};