const express = require('express')
const router = express.Router();
const { fetchAdminUserDetails, fetchUserProfile,updateUser_Profile,addUser,fetchMenuList } = require('../controllers/userController');
const verifyToken = require('../token_verification');


router.get('/admin', fetchAdminUserDetails);
router.get('/getProfile', fetchUserProfile);
router.post('/addUser',verifyToken, addUser);
router.post('/userProfile',verifyToken,updateUser_Profile);
router.get('/getMenu',fetchMenuList);



module.exports = router;
