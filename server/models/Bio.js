const mongoose = require('mongoose')

const instance = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    picture: {
        type: String,
    },
  }
)

const modelName = 'Bio'

module.exports = mongoose.model(modelName, instance)