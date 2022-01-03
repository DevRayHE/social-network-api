const router = require('express').Router();

const {
  getThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router
  .route('./')
  .get(getThought)
  .post(createThought)

// /api/thought/:thoughtId
router
  .route('./thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
  .route('./toughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction)

module.exports = router;