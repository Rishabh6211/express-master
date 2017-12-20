/**
 * UsersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for Register users
 */
import registerObj from '../models/registeration';
module.exports = {

    register: (req, res) => {
       let data = req.body;

       registerObj(data).save(data).then((data)=>{
       		res.json(data)
       		cosnole.log("data",data);
       })
    }
};