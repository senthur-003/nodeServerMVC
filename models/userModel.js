const knex = require("knex");

const getAdminUserDetails = async (knex) => {
  return await knex('LOGIN_DETAILS').where('userType', 'admin');
};

const getUserProfile = async (knex) => {
  return await knex('LOGIN_DETAILS').where('userType', 'user');
}

const addUserProfile = async (knex, req) => {

  try {
    return await knex('PROFILE_DETAILS').insert({
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
  } catch (error) {
    const existEntry = await knex('PROFILE_DETAILS').where('EMAIL', req.email).orWhere('PHONE_NUMBER', req.phone).first();
    if (existEntry) {
      if (existEntry.EMAIL === req.email && existEntry.PHONE_NUMBER === req.phone) {
        //  res.status(500).json({ message: 'Both email and phone number already exist.' });
        return ({ status: 'error', message: 'Both email and phone number already exist.' });
      } else if (existEntry.EMAIL === req.email) {
        return ({ status: 'error', message: 'Email  already exist.' });
      } else if (existEntry.PHONE_NUMBER === req.phone) {
        return ({ status: 'error', message: 'Phone number already exist.' });
      }
    } else {
      return error;
    }
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
    return ({status:'error',message:error.message});
  }
}

const getUserMenu = async (knex,req)=>{
  try {
    return await knex.select('*').from('Menus')
  } catch (error) {
    return ({status:'error',message:error.message})
  }
}


module.exports = { getAdminUserDetails, getUserProfile, addUserProfile,addNewUser,getUserMenu };
