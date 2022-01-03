const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user by its _id 
  // TODO: populate thought and friend data
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(400).json({ message: `No user with ID: ${_id}`})
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
      !user
        ? res.status(400).json({ message: `No user with ID: ${_id}`})
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => 
        !user
          ? res.status(400).json({ message: `No user with ID: ${_id}`})
          : Thought.deleteMany({ _id: { $in: user.thought } }) // delte all of the thoughts with the same id
      )
      .then(() => res.json({ message: `Successfully deleted user with ID: ${_id} and the associated thoughts`}))
      .catch((err) => res.status(500).json(err));
  }

};