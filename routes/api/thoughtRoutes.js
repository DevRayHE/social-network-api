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
  .route('/')
  .get(getThought)
  .post(createThought)

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction)

  // /api/thoughts/:thoughtId/reactions/:reactionsId
  router
  .route('/:thoughtId/reactions/:reactionsId')
  .delete(deleteReaction)

module.exports = router;