const mongoose = require('mongoose')

const instance = new mongoose.Schema(
    {
        coordinates: {
            type: String,
            required: true
        }
    }
)

const modelName = 'RunData'

module.exports = mongoose.model(modelName, instance)