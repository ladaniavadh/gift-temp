const logger = require('../lib/logger');
const {authCode} = require('../models/auth_code')

//create
const insertAuthCodeData = async (data) => {
  try {

    const response = new authCode(data)
    const insertedUserData = await response.save()
    return insertedUserData

  } catch (error) {
    logger.error(`Error while inserting data into DB = `, error)
    throw error
  }
}

module.exports = {
    insertAuthCodeData
}