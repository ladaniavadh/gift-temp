const logger = require('../lib/logger');
const dbCons = require('../constant/db-constant')
const dbOpration = require('../constant/db-operation-constant')
const { getSingleUserDetail, insertUserData } = require('../repository/user')
const { insertAuthCodeData } = require('../repository/auth-code')
const { getQuery } = require('../repository/db-operation')
// const uuidv4 = require('uuid')
const sendSms = require('../twilio');

const userDatabase = [];
function generateOTP() {
    var digits = '0123456789';
    var otpLength = 4;
    var otp = '';
    for (let i = 1; i <= otpLength; i++) {
        var index = Math.floor(Math.random() * (digits.length));
        otp = otp + digits[index];
    }
    return otp;
}
const registerUser = async (reqBody) => {
  try {

    const resp = {}

    const query = getQuery('phone', reqBody[dbCons.FIELD_PHONE])
    logger.info('query : ', query);
    const findRequiredKey = await getSingleUserDetail(query);
    logger.info('user phone find success : ', findRequiredKey);
    if (findRequiredKey) {
      resp.status = false;
      resp.message = 'phone is already registered.';
      resp.data = null
      return resp;
    }
    if(findRequiredKey.isActive == false){
      logger.info('phone number has been existed.')
      // return 'phone number has been existed.'
    }else{
      logger.info('phone number is deactivated.')
      // return 'phone number is deactivated.'
    }
    
    const userJson = await registerJson(reqBody)
    logger.info('userJson : ', userJson);

    const otpGenerate = generateOTP()
    // userDatabase.push(userJson);

    const welcomeMessage = `Welcome to Chillz! Your verification code is : ${otpGenerate}`;
    console.log(welcomeMessage);
    // sendSms(user.phone, welcomeMessage);


  } catch (error) {
    throw error
  }
}

const registerJson = async (reqBody) => {
  const register = {}
  // if (reqBody[dbCons.FIELD_NAME]) {
  //   register[dbCons.FIELD_NAME] = reqBody[dbCons.FIELD_NAME]
  // }
  if (reqBody[dbCons.FIELD_PHONE]) {
    register[dbCons.FIELD_PHONE] = reqBody[dbCons.FIELD_PHONE]
  }
  return register
}

module.exports = {
  registerUser
}