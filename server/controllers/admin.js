const Account = require('../models/Account')

const get = async (req, res) => {
    Account.find({role: 'admin'})
        .catch(err => console.log(err))
        .then(result => res.status(200).send(result))
}

const grant = async (req, res) => {
    const email = req.body.email
    Account.findOneAndUpdate({email: email}, {role: 'admin'})
        .catch(err => console.log(err))
        .then(res.status(200).send('Successfully granted admin status'))
}

const revoke = async (req, res) => {
    const email = req.body.email
    console.log(email)
    Account.findOneAndUpdate({email: email}, {role: 'user'})
        .catch(err => console.log(err))
        .then(res.status(200).send('Successfully granted admin status'))
}

module.exports = {
    grant,
    revoke,
    get
}