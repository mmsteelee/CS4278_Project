const Account = require('../models/Account')

const grant = async (req, res) => {
    const email = req.body.email
    Account.findOneAndUpdate({email}, {role: 'admin'})
        .catch(err => console.log(err))
        .then(res.status(200).send('Successfully granted admin status'))
}

const revoke = async (req, res) => {
    const email = req.body.email
    Account.findOneAndUpdate({email}, {role: 'user'})
        .catch(err => console.log(err))
        .then(res.status(200).send('Successfully granted admin status'))
}

module.exports = {
    grant,
    revoke
}