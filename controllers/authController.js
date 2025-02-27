const { login, sendOtp, verifyOTP, userLogin } = require('../models/authModel');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');


const loginProcess = async (req, res) => {
    try {
        const result = await login(req.knex, req.body);
        const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '2h' });
        // const clientIp = req.clientIp;
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const cleanIp = clientIp.replace(/^.*:/, '');
        if (result.length > 0) {
            res.sendResponse(200, 'Logged In Successfully', { token: token, id:result[0].id });
        }
        else {
            res.sendResponse(203, 'Invalid UserName (or) Password');
        }
    }
    catch (error) {
        res.sendResponse(500, error.message);
    }
}

const sendRegOtp = async (req, res) => {
    try {
        const result = await sendOtp(req.knex, req.body);
        res.sendResponse(200, "OTP Sent Successfully", { 'otp': result })
    } catch (error) {
        res.sendResponse(500, error.message);
    }
}

const verifyRegOtp = async (req, res) => {
    try {
        const result = await verifyOTP(req.knex, req.body);
        if (result.length > 0) {
            res.sendResponse(200, 'OTP Verified Successfully');
        }
        else {
            res.sendResponse(203, error, 'Incorrect OTP');
        }

    } catch (error) {
        res.sendResponse(500, error.message);
    }
}

const userLoginProcess = async (req, res) => {
    try {
        const result = await userLogin(req.knex, req.body);
        const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '2h' });
        if (result.length > 0) {
           let userDetails={
                'userId':result[0].Id,
                'userName':result[0].UserName,
                'userRefNo':result[0].UserRefNo
            } 
            res.sendResponse(200, 'Welcome to TCS Online',{ token: token, user:userDetails })
        }
        else {
            res.sendResponse(203, 'Invalid UserName (or) Password');
        }
    } catch (error) {
        res.sendResponse(500, error.message);
    }
}

module.exports = { sendRegOtp, verifyRegOtp, loginProcess, userLoginProcess }
