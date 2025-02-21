const sendResponse = (req, res, next) => {
    res.sendResponse = (statusCode, message,data ={}) => {
        res.status(statusCode).json({
            statuscode: statusCode,
            message: message,
            ...data,
        })
    };
    next();
};

module.exports = sendResponse;
