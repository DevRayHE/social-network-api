const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

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
      //getter method to format the timestamp on query 
      get: (createdAtVal) => formatDate.formatDate(createdAtVal),
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  },
);

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
      //getter method to format the timestamp on query 
      get: (createdAtVal) => formatDate.formatDate(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ reactionSchema ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  },
);

// Create a virtual property 'reactionCount' that gets the amount of Thought's reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;