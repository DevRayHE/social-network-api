const router = require('express').Router();

const {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
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

// routes api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;