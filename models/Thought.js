const { Schema, model } = require('mongoose');

// Schmea to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //TODO: Use a getter method to format the timestamp on query 
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ reactionSchema ],
  }
);

// Create a virtual property 'reactionCount' that gets the amount of Thought's reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// The reactionSchema defines the shape for the reactions subdocument
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //TODO: Use a getter method to format the timestamp on query 
    }
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;