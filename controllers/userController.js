const knex = require('knex');
const { getAdminUserDetails, getUserProfile, updateUserProfile, addNewUser, getUserMenu } = require('../models/userModel');

const fetchAdminUserDetails = async (req, res) => {
  try {
    const result = await getAdminUserDetails(req.knex, req.body);
    res.json(result);
  } catch (err) {
    res.sendResponse(500, err.message);
  }
};

const fetchUserProfile = async (req, res) => {
  const {id} = req.query;
 
  try {
    const result = await getUserProfile(req.knex,id);
    
    res.status(200).json({
      statuscode: '200',
      message: 'success',
      data: result[0]
    })
  } catch (err) {
    res.sendResponse(500, err.message);
  }
};

const updateUser_Profile = async (req, res) => {
 
  
  try {
    const adduser_profile = await updateUserProfile(req.knex,req.body);
    
    if (adduser_profile>0) {
      res.sendResponse(201,'Record updated successfully');
    }
    else {
      res.sendResponse(409,adduser_profile)
    }
  } catch (err) {
    console.log(err.message);
    res.sendResponse(500, err.message);
  }
};


const addUser = async (req, res) => {
  try {
    const adduser = await addNewUser(req.knex, req.body);
    if (adduser.status == 'error') {
      res.status(409).json({
        statuscode: 409,
        message: adduser.message
      })
    }
    else {
      res.status(201).json({
        statuscode: 201,
        message: 'New User added successfully'
      })
    }

  } catch (err) {
    res.sendResponse(500, err.message);
  }
}

const fetchMenuList = async (req, res) => {
  try {
    const menu = await getUserMenu(req.knex, req.body);
    res.status(200).json({
      statuscode: 200,
      data: menu
    })
  } catch (err) {
    res.sendResponse(500, err.message);
  }
}

    
module.exports = { fetchAdminUserDetails, fetchUserProfile, updateUser_Profile, addUser, fetchMenuList };
