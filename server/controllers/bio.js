const Bio = require('../models/Bio')
const Account = require('../models/Account')

const changeBio = async (req, res) => {
    updatedBio = req.body
    Bio.findByIdAndUpdate(req.params.id, req.body)
    .then(res.status(200).send('Updated Bio successfully'))
    .catch(err => res.status(400).send(err))
}

const getBios = async (req, res) => {
    Bio.find({})
        .then(bios => res.status(200).send(bios))
        .catch(err => res.status(400).send(err))
}

const newBio = async (req, res) => {
    const result = await Bio.create(req.body).catch(err => res.status(400).send(err))
    res.status(200).send(result)
}

const deleteBio = async (req, res) => {
    Bio.findByIdAndDelete(req.params.id)
        .catch(err => res.status(404).send(err))
        .then(res.send(`Successfully deleted Bio ${req.params.id}`))
}  

module.exports = {
    changeBio,
    getBios,
    newBio,
    deleteBio
  }
  