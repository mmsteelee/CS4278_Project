const Bio = require('../models/Bio')

const defaultPicture = 'https://res.cloudinary.com/dalnl907c/image/upload/v1670189450/ccixonlndrey3n0rnpxa.jpg'

const changeBio = async (req, res) => {
    updatedBio = req.body

    Bio.findByIdAndUpdate(req.params.id, updatedBio)
    .then(res.status(200).send(updatedBio))
    .catch(err => res.status(400).send(err))
}

const getBios = async (req, res) => {
    Bio.find({})
        .then(bios => res.status(200).send(bios))
        .catch(err => res.status(400).send(err))
}

const newBio = async (req, res) => {
    const count = await Bio.count()
    let bio = req.body
    bio.picture = defaultPicture

    if (count > 10) {
        res.status(400).send('Cannot add another Bio')
    } else {
        const result = await Bio.create(bio).catch(err => res.status(400).send(err))
        res.status(200).send(result)
    }
}

const deleteBio = async (req, res) => {
    Bio.findByIdAndDelete(req.params.id)
        .then( oldBio =>
            res.send(`Successfully deleted Bio ${oldBio.id}`)
        )  
        .catch(err => res.status(404).send(err))
}  

module.exports = {
    changeBio,
    getBios,
    newBio,
    deleteBio
  }
  