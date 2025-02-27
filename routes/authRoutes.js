const express =require('express')
const router = express.Router();

const {sendRegOtp,verifyRegOtp, loginProcess,userLoginProcess} = require('../controllers/authController');

router.post('/regOtp',sendRegOtp);
router.post('/verifyOtp',verifyRegOtp);
router.post('/login',loginProcess);
router.post('/userLogin',userLoginProcess);



module.exports = router;