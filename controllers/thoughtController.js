const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by its _id 
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: `No thought with ID: ${_id}`})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  // TODO: push the created thought's _id to the associated user's thoughts array field
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
      !thought
        ? res.status(400).json({ message: `No thought with ID: ${_id}`})
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
          ? res.status(400).json({ message: `No thought with ID: ${_id}`})
          : res.json({ message: `Successfully deleted thought with ID: ${_id}`})
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
      !thought
        ? res.status(400).json({ message: `No thought with ID: ${_id}`})
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a user's friend list
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionsId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(400).json({ message: `No thought with ID: ${_id}`})
          : res.json(user)
      )
      .then(() => res.json({ message: `Successfully deleted reaction with ID: ${req.body.reactionsId} from thought with ID: ${_id}`}))
      .catch((err) => res.status(500).json(err));
  },

};