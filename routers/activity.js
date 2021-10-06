const express = require('express');
const activity = require('../controllers/activity');
const validate = require('express-validation');
const { createActivity, listUsers, updateUser } = require('../validations/activity.validation')
const router = express.Router();

router
  .route('/')
  .post(validate(createActivity), activity.register)
  .get(validate(listUsers), activity.list)

router
  .route('/:id')
  .get(activity.activityDetails)
  .put(validate(updateUser), activity.update)
  .delete(activity.updateActivityStatus)


// router.post('/register', activity.register)
// router.get('/list', activity.list)
// router.get('/:id', activity.activityDetails)
// router.put('/:id', activity.update)
// router.delete('/:id', activity.deleteActivityData)

module.exports = router