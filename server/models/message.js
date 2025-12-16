const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    subject: { type: String },
    msgText: { type: String, required: true },
    sender: { type: String, required: true }, 
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

module.exports = mongoose.model('Message', messageSchema);
