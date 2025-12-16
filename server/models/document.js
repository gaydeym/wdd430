const mongoose = require('mongoose');

let childSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
});

const documentSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    children: [childSchema],
  },
  {
    toJSON: {
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model('Document', documentSchema);
