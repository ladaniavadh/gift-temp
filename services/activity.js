const _msg = require('../config/message')
const logger = require('../lib/logger');
const dbCons = require('../constant/db-constant')
const dbOpration = require('../constant/db-operation-constant')
const { getSingleActivityDetail, insertActivityData, findActivityListDetails, findAndUpdateActivityData, findAndPagination, countActivityData } = require('../repository/activity_repo')
const { getQuery, getUpdateQuery } = require('../repository/db-operation')
const { imageUpdaloadServices } = require('./activityBannerImg')
const mongoose = require('mongoose')

//Add activity
const register = async (reqHeaders, reqBody, files) => {
  let lang = reqHeaders.language ? reqHeaders.language : 'EN';
  try {
    const resp = {}

    const query = getQuery('title', reqBody[dbCons.FIELD_TITLE])
    const findRequiredKey = await getSingleActivityDetail(query);
    logger.info('title find success : ', findRequiredKey);
    if (findRequiredKey) {
      return {
        serverResponse: {
          isError: true,
          message: _msg[204][lang],
          statusCode: 'OK'
        },
        result: {
          data: {}
        }
      };
    }
    const activityJson = await registerJson(reqBody, files)
    logger.info('activityJson : ', activityJson);

    //save data in to DB.
    const registerData = await insertActivityData(activityJson);
    logger.info('registerData : ', registerData)
    return {
      serverResponse: {
        isError: false,
        message: _msg[200][lang],
        statusCode: 'OK'
      },
      result: {
        data: registerData
      }
    };

  } catch (error) {
    console.log('error : ', error)
    throw {
      serverResponse: {
        isError: true,
        message: _msg[500][lang],
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    };
  }
}

//Get activity list
const list = async (reqHeaders, reqQuery) => {
  let lang = reqHeaders.language ? reqHeaders.language : 'EN';
  try {
    const resp = {}

    //pagination
    const paginationActivity = await pagination(reqQuery)
    if (paginationActivity.status == false) {
      return paginationActivity
    }
    logger.info('paginationActivity success : ', paginationActivity);

    const query = getQuery('active', true)

    const activityData = await findAndPagination(query, paginationActivity.limit, paginationActivity.skip)
    logger.info('article is find success : ', activityData)

    const countActivity = await countActivityData(query)
    if (activityData && activityData.length > 0) {
      return {
        serverResponse: {
          isError: false,
          message: _msg[200][lang],
          statusCode: 'OK'
        },
        result: {
          data: { countActivity: countActivity, page: paginationActivity.page, size: paginationActivity.size, activityData: activityData }
        }
      };
    } else {
      return {
        serverResponse: {
          isError: true,
          message: _msg[500][lang],
          statusCode: 'INTERNAL_SERVER_ERROR'
        },
        result: {
          data: { countActivity: countActivity, page: paginationActivity.page, size: paginationActivity.size, activityData: activityData }
        }
      }
    }

  } catch (error) {
    throw {
      serverResponse: {
        isError: true,
        message: _msg[500][lang],
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    };
  }
}

//Get activity detail
const activityDetails = async (reqHeaders, reqParams) => {
  let lang = reqHeaders.language ? reqHeaders.language : 'EN';
  try {
    const resp = {}

    const query = getQuery('_id', reqParams[dbCons.FIELD_ID])
    const activity = await getSingleActivityDetail(query)
    logger.info('activeList  : ', activity);
    if (activity) {
      return {
        serverResponse: {
          isError: false,
          message: _msg[200][lang],
          statusCode: 'OK'
        },
        result: {
          data: activity
        }
      };
    } else {
      return {
        serverResponse: {
          isError: true,
          message: _msg[500][lang],
          statusCode: 'INTERNAL_SERVER_ERROR'
        }
      }
    }
  } catch (error) {
    throw {
      serverResponse: {
        isError: true,
        message: _msg[500][lang],
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    };
  }
}

//Update activity detail
const update = async (reqHeaders, reqBody, reqParams, files) => {
  let lang = reqHeaders.language ? reqHeaders.language : 'EN';
  try {
    const resp = {}
    var isValid = mongoose.Types.ObjectId.isValid(reqParams[dbCons.FIELD_ID]);//objectid valid or not... this line is check...
    logger.info('isvalid is working : ', isValid)
    if (isValid) {
      const updateJson = await updateActivityData(reqBody, files)
      logger.info('updateJson is  : ', updateJson);
      if (updateJson.success == false) {
        return updateJson
      }
      const query = getQuery('_id', reqParams[dbCons.FIELD_ID])
      logger.info('query is working : ', query)
      const updateActivity = await findAndUpdateActivityData(query, updateJson, { new: true })
      logger.info('updateActivity is updated : ', updateActivity);
      if (updateActivity) {
        return {
          serverResponse: {
            isError: false,
            message: _msg[200][lang],
            statusCode: 'OK'
          },
          result: {
            data: updateActivity
          }
        };
      } else {
        return {
          serverResponse: {
            isError: true,
            message: _msg[2001][lang],
            statusCode: 'INTERNAL_SERVER_ERROR'
          }
        }
      }
    } else{
      return {
        serverResponse: {
          isError: true,
          message: _msg[2001][lang],
          statusCode: 'INTERNAL_SERVER_ERROR'
        }
      }
    }
  } catch (error) {
    throw {
      serverResponse: {
        isError: true,
        message: _msg[500][lang],
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    };
  }
}


const updateActivityStatus = async (reqHeaders, reqParams) => {
  let lang = reqHeaders.language ? reqHeaders.language : 'EN';
  try {
    const resp = {}
    var isValid = mongoose.Types.ObjectId.isValid(reqParams[dbCons.FIELD_ID]);//objectid valid or not... this line is check...
    logger.info('isvalid is working : ', isValid)
    if (isValid) {

      const activityId = getQuery('_id', reqParams[dbCons.FIELD_ID])
      const activity = await getSingleActivityDetail(activityId)
      logger.info('activeList  : ', activity);

      // const queryFind = getQuery('_id', reqParams[dbCons.FIELD_ID])
      // logger.info('queryFind is working : ', queryFind)
      if(activity.active == true){
      const query = getUpdateQuery([dbOpration.OP_SET], 'active', false)

      const activityDataDelete = await findAndUpdateActivityData(activity, query, { new: true });
      logger.info('activity Data Passbook Delete  : ', activityDataDelete)
      if (activityDataDelete) {
        return {
          serverResponse: {
            isError: false,
            message: _msg[200][lang],
            statusCode: 'OK'
          },
          result: {
            data: activityDataDelete
          }
        };
      } else {
        return {
          serverResponse: {
            isError: true,
            message: _msg[2001][lang],
            statusCode: 'INTERNAL_SERVER_ERROR'
          }
        }
      }
    }else{
      const query = getUpdateQuery([dbOpration.OP_SET], 'active', true)

      const activityDataDelete = await findAndUpdateActivityData(activity, query, { new: true });
      logger.info('activity Data Passbook Delete  : ', activityDataDelete)
      if (activityDataDelete) {
        return {
          serverResponse: {
            isError: false,
            message: _msg[200][lang],
            statusCode: 'OK'
          },
          result: {
            data: activityDataDelete
          }
        };
      } else {
        return {
          serverResponse: {
            isError: true,
            message: _msg[2001][lang],
            statusCode: 'INTERNAL_SERVER_ERROR'
          }
        }
      }
    }
      // if (activityDataDelete) {
      //   resp.status = true;
      //   resp.message = 'Valid id remove activity data successfully.';
      //   resp.data = activityDataDelete;
      //   return resp;
      // } else {
      //   resp.status = true;
      //   resp.message = 'Id is already remove.';
      //   resp.data = activityDataDelete;
      //   return resp;
      // }
    } else{
      return {
        serverResponse: {
          isError: true,
          message: _msg[2001][lang],
          statusCode: 'INTERNAL_SERVER_ERROR'
        }
      }
    }
    // else {
    //   resp.status = false;
    //   resp.message = 'Invalid id remove activity data not success.';
    //   resp.data = null
    //   return resp
    // }
  } catch (error) {
    logger.error('Error in service to delete activity data details : ', error)
    throw error
  }
}

const registerJson = async (reqBody, files) => {
  const register = {}
  if (reqBody[dbCons.FIELD_TITLE]) {
    register[dbCons.FIELD_TITLE] = reqBody[dbCons.FIELD_TITLE]
  }
  if (reqBody[dbCons.FIELD_DESCRIPTION]) {
    register[dbCons.FIELD_DESCRIPTION] = reqBody[dbCons.FIELD_DESCRIPTION]
  }
  if (files[dbCons.FIELD_BANNER]) {
    const imagePhotos = await imageUpdaloadServices(files[dbCons.FIELD_BANNER])
    register[dbCons.FIELD_BANNER] = imagePhotos
  }
  // if (authEntity[dbCons.FIELD_ID]) {
  if (reqBody[dbCons.FIELD_CREATED_BY]) {
    register[dbCons.FIELD_CREATED_BY] = reqBody[dbCons.FIELD_CREATED_BY]
  }
  return register
}

//Pagination
const pagination = async (reqQuery) => {
  const resp = {};
  const {
    page = 1, size = 10,
  } = reqQuery;
  logger.info('pagination :', reqQuery);
  // For pagination
  const limit = parseInt(size);
  if (!parseInt(page)) {
    resp.status = false;
    resp.message = 'In page only number is valid.';
    resp.data = { "count": 0, page, size, 'article': [] }
    return resp
  }
  const skip = (page - 1) * size;
  if (!parseInt(size)) {
    resp.status = false;
    resp.message = 'In size only number is valid.';
    resp.data = { "count": 0, page, size, 'article': [] }
    return resp
  }
  logger.info('limi and skip is work', { limit, skip })
  return { limit, skip, page, size } //b'coz need all 4.
}

const updateActivityData = async (reqBody, files) => {
  const updateJson = {}
  if (reqBody[dbCons.FIELD_TITLE]) {
    updateJson[dbCons.FIELD_TITLE] = reqBody[dbCons.FIELD_TITLE]
  }
  if (reqBody[dbCons.FIELD_DESCRIPTION]) {
    updateJson[dbCons.FIELD_DESCRIPTION] = reqBody[dbCons.FIELD_DESCRIPTION]
  }
  if (files[dbCons.FIELD_BANNER]) {
    const imagePhotos = await imageUpdaloadServices(files[dbCons.FIELD_BANNER])
    updateJson[dbCons.FIELD_BANNER] = imagePhotos
  }
  return updateJson
}

module.exports = {
  register,
  list,
  update,
  updateActivityStatus,
  activityDetails
}