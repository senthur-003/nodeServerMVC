const knex = require("knex");

const getAdminUserDetails = async (knex) => {
  return await knex('LOGIN_DETAILS').where('userType', 'admin');
};

const getUserProfile = async (knex, req) => {
  return await knex('PROFILE_DETAILS').where('login_Id', req);
}

const updateUserProfile = async (knex, req) => {

  
  try {
    return await knex('PROFILE_DETAILS').where('LOGIN_ID', req.id).update({
      FIRST_NAME: req.firstname,
      LAST_NAME: req.lastname,
      USER_NAME: req.userName,
      PHONE_NUMBER: req.phone,
      USER_EMAIL: req.email,
      DOOR_NO: req.doorNo,
      STREET: req.street,
      CITY: req.city,
      STATE: req.state,
      COUNTRY: req.country,
      POSTAL_CODE: req.pincode,
      DOB: req.dob,
      GENDER: req.gender,
    });
    // return await knex('PROFILE_DETAILS').insert({
    //   FIRST_NAME: req.firstname,
    //   LAST_NAME: req.lastname,
    //   USER_NAME: req.userName,
    //   PHONE_NUMBER: req.phone,
    //   USER_EMAIL: req.email,
    //   DOOR_NO: req.doorNo,
    //   STREET: req.street,
    //   CITY: req.city,
    //   STATE: req.state,
    //   COUNTRY: req.country,
    //   POSTAL_CODE: req.pincode,
    //   DOB: req.dob,
    //   GENDER: req.gender,
    // });
  } catch (error) {
      return error;
  }

}

const addNewUser = async (knex, req) => {
  try {
    return await knex('Users').insert({
      UserName: req.name,
      Password: req.password,
      createdBy: req.createdBy,
      IsActive: req.isActive,
      UserRefNo: req.userRefNo
    });
  } catch (error) {
    return ({ status: 'error', message: error.message });
  }
}

const getUserMenu = async (knex, req) => {
  try {
    return await knex.select('*').from('Menus')
  } catch (error) {
    return ({ status: 'error', message: error.message })
  }
}


module.exports = { getAdminUserDetails, getUserProfile, updateUserProfile, addNewUser, getUserMenu };
