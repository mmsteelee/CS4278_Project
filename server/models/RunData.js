const mongoose = require('mongoose')

const instance = new mongoose.Schema(
    {
        geo_json: {
            type: String,
            required: true
        }
    }
)

const modelName = 'RunData'

module.exports = mongoose.model(modelName, instance)