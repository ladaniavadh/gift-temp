const httpStatusCode = require('http-status-codes');
const userServices = require('../services/user');
const logger = require('../lib/logger');

const registerUser = async (req, res) => {
  try {
    logger.info('controller is responding or not : ', req.body);

    const response = await userServices.registerUser(req.body);
    logger.info('user register successfully : ', response);
    return res.status(httpStatusCode.StatusCodes.OK).send(response);

  } catch (error) {
    logger.error('user register successfully : ', error);
    return res.status(httpStatusCode.StatusCodes.BAD_REQUEST).send(error)
  }
}

module.exports = {
  registerUser
}