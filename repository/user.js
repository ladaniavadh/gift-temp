const logger = require('../lib/logger');
const {User} = require('../models/user')

const getSingleUserDetail = async (query) => { //all collection model name.
  try {
    logger.info('get Single User Detail : ', query)
    let response = await User.findOne(query)
    return response
  } catch (error) {
    logger.error('Error in getting db data', error)
    throw error
  }
}

//create
const insertUserData = async (data) => {
  try {

    const response = new User(data)
    const insertedUserData = await response.save()
    return insertedUserData

  } catch (error) {
    logger.error(`Error while inserting data into DB = `, error)
    throw error
  }
}

module.exports = {
  getSingleUserDetail,
  insertUserData
}