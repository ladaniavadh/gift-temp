const logger = require('../lib/logger');
const { Activity } = require('../models/activity')

const getSingleActivityDetail = async (query) => { //all collection model name.
  try {
    logger.info('get Single User Detail : ', query)
    let response = await Activity.findOne(query)
    return response
  } catch (error) {
    logger.error('Error in getting db data', error)
    throw error
  }
}

//list
const findActivityListDetails = async (query) => {
  try {

    let response = await Activity.find(query)
    return response
  } catch (error) {
    logger.error('Error in getting db data', error)
    throw error
  }
}

const countActivityData = async (data) => { 
  try {
      let response = await Activity.count(data)
      return response
    } catch (error) {
      logger.error('Error in getting Activity db data : ', error)
      throw error
    }    
}

const findAndPagination = async (data, limit, skip) => { 
  try {
      let response = await Activity.find(data).limit(limit).skip(skip)
      return response
    } catch (error) {
      logger.error('Error in getting Activity db data : ', error)
      throw error
    }    
}

const findAndUpdateActivityData = async (data, updateId, fields) => {
  try {

    let response = await Activity.findOneAndUpdate(data, updateId, fields)
    return response

  } catch (error) {
    logger.error(`Error while update activity data into DB = `, error)
    throw error
  }
}


//create
const insertActivityData = async (data) => {
  try {

    const response = new Activity(data)
    const insertedUserData = await response.save()
    return insertedUserData

  } catch (error) {
    logger.error(`Error while inserting data into DB = `, error)
    throw error
  }
}

module.exports = {
  getSingleActivityDetail,
  insertActivityData,
  findActivityListDetails,
  findAndUpdateActivityData,
  countActivityData,
  findAndPagination
}