const knex = require('knex');
const { getAdminUserDetails, getUserProfile, addUserProfile, addNewUser, getUserMenu,getProduct_byId  } = require('../models/userModel');

const fetchAdminUserDetails = async (req, res) => {
  try {
    const result = await getAdminUserDetails(req.knex, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchUserProfile = async (req, res) => {

  try {
    const result = await getUserProfile(req.knex);
    res.status(200).json({
      statuscode: '200',
      message: 'success',
      data: result
    })
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const addUser_Profile = async (req, res) => {
  try {
    const adduser_profile = await addUserProfile(req.knex, req.body);
    if (adduser_profile.status == 'error') {
      res.status(409).json({
        statuscode: 409,
        message: adduser_profile.message,
      });
    }
    else {
      res.status(201).json({
        statuscode: 201,
        message: 'Registration Completed',
      });
    }
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
}

const fetchMenuList = async (req, res) => {
  try {
    const menu = await getUserMenu(req.knex, req.body);
    res.status(200).json({
      statuscode: 200,
      data: menu
    })
  } catch (error) {
    res.status(500).json(err);
  }
}





module.exports = { fetchAdminUserDetails, fetchUserProfile, addUser_Profile, addUser, fetchMenuList };
