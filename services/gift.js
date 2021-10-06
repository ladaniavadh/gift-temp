const {Gift} = require('../models/gift');
// const { update } = require('../services/activity');
const createGift = async (req) =>{
    console.log(req.body);
    const gift = new Gift({
        name:req.body.name,
        number:req.body.number,
        credit:req.body.credit,
        stock:req.body.stock,
        active:req.body.active,
        description:req.body.description,
        imageUrl:req.body.imageUrl
    })
    try{
        const insrtedGiftData = await gift.save();
        return insrtedGiftData;
    }catch(err){
        throw err
    } 

}

const findGift = async (id) =>{
    try{
        const result = await Gift.findById(id);
        return result;
    }
    catch(err){
        console.log(err)
    }

}

const updateGift = async(id) =>{
    try{
        const gift = await Gift.findById(id);
        if(gift.active === true){
            gift.active = false;
        }
        else if(gift.active === false){
            gift.active = true;
        }
        const updatedGift = await gift.save();
        return updatedGift;
    }
    catch(err){
        console.log(err);
    }
}

const deleteGift = async(id) =>{
    try{
        const result = await Gift.findByIdAndDelete(id);
        return result;
    }
    catch(err){
        console.log(err)
    }
}
module.exports = {
    createGift,
    findGift,
    updateGift,
    deleteGift
}