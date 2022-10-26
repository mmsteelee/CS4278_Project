const mongoose = require('mongoose')

const instance = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        distance: {
            type: Number,
            required: true
        },
        tags: {
            type: [String],
            required: true,
        },
        data_id: {
            type: Number,
            required: true
        }
    }
)

const modelName = 'RunMeta'

module.exports = mongoose.model(modelName, instance)