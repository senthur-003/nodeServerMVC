const knex = require("knex");

const login = async (knex, req) => {
    try {
        result = await knex('LOGIN_DETAILS')
            .select('*')
            .where('email', req.email)
            .where('passwrd', req.password);
        return result;
    } catch (error) {
        return error.message;
    }
}

const userLogin = async (knex, req) => {
    try {
        result = await knex('Users')
            .select('*')
            .where('UserRefNo', req.user)
            .orWhere('UserName', req.user)
            .where('Password', req.password);
        return result;
    } catch (error) {
        return error.message;

    }
}
const sendOtp = async (knex, req) => {
    const NewOtp = Math.floor(100000 + Math.random() * 900000);

    try {
        await knex('AUTHOTP').insert({
            VERIFY_TYPE: req.verficationType,
            VERIFY_VALUE: req.verficationValue,
            OTP_VALUE: NewOtp
        })
        return NewOtp;

    } catch (error) {
        return error.message;
    }
}

const verifyOTP = async (knex, req) => {
    const verificationType = req.verificationType || '';
    const verificationValue = req.verificationValue || '';
    const otpValue = req.otpValue || '';


    try {
        const result = await knex('AUTHOTP')
            .select('*')
            .where('VERIFY_TYPE', req.verficationType)
            .where('VERIFY_VALUE', req.verficationValue)
            .where('OTP_VALUE', req.otpValue);
        return result
    } catch (error) {
        return error.message;
    }
}

module.exports = { sendOtp, verifyOTP, login, userLogin };


