const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "My_Secret";

//Route 1: Create a user using POST "/api/auth/createuser". No login required
router.post('/createuser', [
    // body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty())
        return res.status(400).json({success, errors: errors.array() });
    //check whether the user with this email exiustsnpm install bcrypt
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success,message:"sorry a user with this email exists already"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data={
            user : {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({success:true,authtoken})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({success,message:"Internal server error"});
    }
})


//Route 2: Authenticate a user using POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').exists(),
], async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty())
        return res.status(400).json({success, errors: errors.array() });
    
     const {email, password} = req.body;
    //check whether the user with this email exiustsnpm install bcrypt
    try {
        let user = await User.findOne({ email: req.body.email });
        //if nor user on that mail then user=null
        if(!user){
            return res.status(400).json({success,message:"Please try to login with correct credentials"});
        }
        
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success,message:"Please try to login with correct credentials"});
        }
        
        const data={
            user : {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken})
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})



//Route 3: Get logged in user Details using POST "/api/auth/getuser".  login required
router.post('/getuser',fetchuser ,async (req, res) => {
    try{
        userdId = req.user.id;
        const user = await User.findById(userdId).select("-password");
        res.send({user});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router