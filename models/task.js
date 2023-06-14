const { bool } = require('joi');
const { Schema, model } = require('mongoose');

const taskSchema = Schema(
  {
    title: {
      type: String,
      defaulf: 'Title',
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
      trim: true,
    },
    category: {
      type: String,
      enum: ['to-do', 'in-progress', 'done'],
      default: 'to-do',
      trim: true,
    },
    remindSet: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model('task', taskSchema);

module.exports = Task;
