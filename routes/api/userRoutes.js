const router = require('express').Router();

const {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// routes api/users
router
  .route('/')
  .get(getUsers)
  .post(createUser);

// routes api/users/:userId
router
  .route('/:userId')
  .get(getUserbyId)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;