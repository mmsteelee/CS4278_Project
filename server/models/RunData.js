const mongoose = require('mongoose')

const instance = new mongoose.Schema(
    {
        route: {
            type: Array,
            required: true
        },
        waypoints: {
            type: Array,
            required: true
        }
    }
)

const modelName = 'RunData'

module.exports = mongoose.model(modelName, instance)