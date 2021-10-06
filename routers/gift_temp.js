const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const gift = require('../controllers/gift_temp');
const { createGift } = require('../validations/gift.validation');

// router.post('/register', user.registerUser)
router.get('/',(req,res)=>{
    res.send({
        status: "Successful",
        message: "Home page of v1/gift"
    });
})

//Create
router.post('/create', validate(createGift), gift.createGift);

// Read
router.get('/show/:id',gift.showGift);

//Update
router.put('/update/:id',gift.updateGift);

//Delete
router.delete('/delete/:id',gift.deleteGift);

module.exports = router