const fs = require('fs')

const Bio = require('../models/Bio')

const defaultPicture = 'logo.jpeg'

const changeBio = async (req, res) => {
    const oldBio = await Bio.findById(req.params.id)
    updatedBio = req.body
    
    // Need to delete old image since the new one has been uploaded
    if (req.file && oldBio.picture != defaultPicture) {
        fs.unlink('./images/'+oldBio.picture, (err) => {
            if (err) {
                console.error(err)
        }})
    }
        
    if (req.file) {
        updatedBio.picture = req.file.filename
    } else {
        updatedBio.picture = oldBio.picture
    }

    Bio.findByIdAndUpdate(req.params.id, updatedBio)
    .then(res.status(200).send('Updated Bio successfully'))
    .catch(err => res.status(400).send(err))
}

const getBios = async (req, res) => {
    Bio.find({})
        .then(bios => res.status(200).send(bios))
        .catch(err => res.status(400).send(err))
}

const newBio = async (req, res) => {
    const count = await Bio.count()

    if (count > 10) {
        res.status(400).send('Cannot add another Bio')
    } else {
        const result = await Bio.create(req.body).catch(err => res.status(400).send(err))
        res.status(200).send(result)
    }
}

const deleteBio = async (req, res) => {
    Bio.findByIdAndDelete(req.params.id)
        .then( oldBio => {
            if (oldBio.picture != defaultPicture) {
                fs.unlink('./images/'+oldBio.picture, (err) => {
                    if (err) {
                        console.error(err)
                }})
            }
            res.send(`Successfully deleted Bio ${oldBio.id}`)
        })  
        .catch(err => res.status(404).send(err))
}  

module.exports = {
    changeBio,
    getBios,
    newBio,
    deleteBio
  }
  