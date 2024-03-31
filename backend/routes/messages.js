const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Messages = require("../models/Messages");
const { body, validationResult } = require('express-validator');


//Route 1: Get all notes using Get "/api/notes/fetchallnotes".  login required
router.get('/fetchallmessages', fetchuser ,async (req,res)=>{
    let success = true;
    try{
        const messages = await Messages.find({user: req.user.id});
        res.json({success,messages});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success: false,message:"Internal server error"});
    }
})

router.post('/addmessage', fetchuser,async (req,res)=>{
    let success = true;
    try{
        const {messageContent, result} = req.body;

        const message = new Messages({
            message: messageContent,result, user:req.user.id
        });
        const savedMessage = await message.save();
        res.json({success,savedMessage});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success: false,message:"Internal server error"});
    }
})

module.exports = router
