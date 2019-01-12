'use strict';
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  image: {type: String, default: '/test'},
  plantStart: {type: Date},
  plantEnd: {type: Date}
});

plantSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Plant', plantSchema);