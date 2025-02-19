const {login,sendOtp,verifyOTP} = require('../models/authModel');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');


const loginProcess = async (req,res) =>{
    try{
        const result = await login(req.knex, req.body);
        const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '2h' });
        // const clientIp = req.clientIp;
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const cleanIp = clientIp.replace(/^.*:/, '');
        if(result.length>0){
            res.status(200).json({
                message:"Logged In Successfully",
                token: token,
                // ip:cleanIp
            });
        }
        else{
            res.status(203).json({
                statuscode:203,
                message:"Invalid UserName (or) Password",
            });
        }
    }
    catch(error){
        res.send(error.message);
    }
}

const sendRegOtp = async (req,res) =>{
    try{
        const result = await sendOtp(req.knex,req.body);
        res.status(200).json({
            statuscode:200,
            message:"OTP Sent Successfully",
            data:{'otp':result}
        })
    }catch(error){
       res.status(500).send(error.message);
    }
}

const verifyRegOtp = async (req,res) => {
    try{
        const result = await verifyOTP(req.knex,req.body);
        if(result.length>0){
            res.status(200).json({
                statuscode:200,
                message:'OTP Verified Successfully',
            })
        }
        else{
            res.status(203).json({
                statuscode:203,
                message:'Incorrect OTP',
            })
        }
        
    }catch(error){
        res.status(500).send(error.message);
    }
}

module.exports={sendRegOtp,verifyRegOtp,loginProcess}
