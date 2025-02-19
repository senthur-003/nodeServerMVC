const express =require('express')
const router = express.Router();

const {sendRegOtp,verifyRegOtp, loginProcess,} = require('../controllers/authController');

router.post('/regOtp',sendRegOtp);
router.post('/verifyOtp',verifyRegOtp);
router.post('/login',loginProcess);


module.exports = router;