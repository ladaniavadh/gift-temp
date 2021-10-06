const logger = require('../lib/logger');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "codeflash",
  api_key: "327231987231189",
  api_secret: "gbbX5aLtp3tNG7qNKmCDGmr_2Pc"
});

const imageUpdaloadServices = async (file) => {
  const imageUpload = new Promise(function (resolve, reject) {
    try {
      // collected image from a user
      const data = {
        image: file.path,
      }
      // upload image here
      cloudinary.uploader.upload(data.image)
        .then((result) => {
          logger.info('result : ', JSON.stringify(result));
          //get message on postman..
          return resolve(result.url);//result.url mean image is success than give url
        }).catch((error) => {
          logger.error(error);
          return reject({ message: 'image upload is faild' });
        });
    } catch (error) {
      logger.error('image error', error);
      throw error
    }
  })
  return imageUpload //imageUpload is return b'coz in postman get the message via promise..
}

module.exports = { imageUpdaloadServices }