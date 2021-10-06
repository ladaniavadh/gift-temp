// const {Gift} = require('../models/gift');
const gift_services = require('../services/gift')
const showGift = async (req, res) => {

    try{
        const result = await gift_services.findGift(req.params.id);
        console.log(result)
        res.send(result);
    }catch(err){
        console.log("An error occured due to ",err);
    }

  }
  
const createGift = async (req,res) =>{
    try{
        const result  = await gift_services.createGift(req);
        res.send(result);
    }
    catch(error){
        console.log("Error occured due to ",error);
    }

}

const updateGift = async(req,res) => {
    try{
        const result  = await gift_services.updateGift(req.params.id);
        res.send(result);
    }
    catch(error){
        console.log("Error occured due to ",error);
    }
}

const deleteGift = async(req,res) => {
    try{
        const result  = await gift_services.deleteGift(req.params.id);
        res.send(result);
    }
    catch(error){
        console.log("Error occured due to ",error);
    }
}

  module.exports = {
    showGift,
    createGift,
    updateGift,
    deleteGift,
}