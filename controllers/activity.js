const httpStatus = require('http-status');
const formidable = require('formidable');
const acticityServices = require('../services/activity');
const { validateActivity } = require('../models/activity');

const logger = require('../lib/logger');

const register = async (req, res) => {
  try {
    logger.info('controller is responding or not : ', req.body);

    const form = new formidable.IncomingForm()
    const files = await parseForm(form, req)

    const response = await acticityServices.register(req.headers, req.body, files);
    // logger.info('register successfully : ', response);
    return res.status(httpStatus[response.serverResponse.statusCode]).send(response);

  } catch (error) {
    return res.status(httpStatus[error.serverResponse.statusCode]).send(error)
  }
}

const list = async (req, res) => {
  try {
    logger.info('controller is responding or not : ', req.body);

    const response = await acticityServices.list(req.headers, req.query);
    logger.info('listing successfully : ', response);
    return res.status(httpStatus[response.serverResponse.statusCode]).send(response);

  } catch (error) {
    logger.error('listing successfully : ', error);
    return res.status(httpStatus[error.serverResponse.statusCode]).send(error)
  }
}

//get specific user
const activityDetails = async (req, res) => {
  try {
    logger.info('controller is responding or not : ', req.params);

    const response = await acticityServices.activityDetails(req.headers, req.params);
    logger.info('listing successfully : ', response);
    return res.status(httpStatus[response.serverResponse.statusCode]).send(response);

  } catch (error) {
    logger.error('listing successfully : ', error);
    return res.status(httpStatus[error.serverResponse.statusCode]).send(error)
  }
}

const update = async (req, res) => {
  try {
    logger.info('controller is responding or not : ', req.body);

    const form = new formidable.IncomingForm()
    const files = await parseForm(form, req)

    const response = await acticityServices.update(req.headers, req.body, req.params, files);
    logger.info('update successfully : ', response);
    return res.status(httpStatus[response.serverResponse.statusCode]).send(response);

  } catch (error) {
    logger.error('update successfully : ', error);
    return res.status(httpStatus[error.serverResponse.statusCode]).send(error)
  }
}

const updateActivityStatus = async (req, res) => {
  try {
    logger.info('controller is responding or not : ', req.body);

    const form = new formidable.IncomingForm()
    const files = await parseForm(form, req)

    const response = await acticityServices.updateActivityStatus(req.headers, req.params);
    logger.info('update successfully : ', response);
    return res.status(httpStatus[response.serverResponse.statusCode]).send(response);

  } catch (error) {
    logger.error('update successfully : ', error);
    return res.status(httpStatus[error.serverResponse.statusCode]).send(error)
  }
}


//imageUpload
//form user data pass in form-data
function parseForm(form, req) {
  return new Promise((resolve, reject) => {
    try {
      if (!req.hasOwnProperty('headers') || req['headers']['content-length'] === 0) {
        return reject(new Error('No form contents')) //check it postman in form-data pass any field or not...
      }
      form.parse(req, function (err, fields, files) {
        // logger.info('fields : ', fields)
        // logger.info('files : ', files)
        req.body = fields //in services pass req.body here pass fields
        if (err) {
          return reject(err)
        }
        return resolve(files)
      })
    } catch (error) {
      return res.status(httpStatusCode.StatusCodes.BAD_REQUEST).send(error)
    }

  })
}

module.exports = {
  register,
  list,
  update,
  updateActivityStatus,
  activityDetails
}