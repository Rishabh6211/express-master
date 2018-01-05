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
        CenterService.Get(req, res);
    }
};