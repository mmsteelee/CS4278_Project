const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/:name', (req, res) => {
    let  options = {
        root: path.join(__dirname, '../images')
    }
    res.sendFile(req.params.name, options)
})

module.exports = router