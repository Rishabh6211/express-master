/**
 * CentersController
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing Trainers
 */



import TrainerService from '../services/TrainerService';
module.exports = {

    SaveTrainer: (req, res) => {
        TrainerService.SaveTrainer(req, res);
    },
    GetTrainer: (req, res) => {
        TrainerService.GetTrainer(req, res);
    },
    SearchTrainer: (req,res) => {
    	TrainerService.SearchTrainer(req, res);
    }
   /* DisplayCenter: (req,res) => {
    	CenterService.DisplayCenter(req, res);
    }*/
    
};