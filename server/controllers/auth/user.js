const Acount = require('../../models/Account')

const user = async (req, res) => {
    Acount.findById(req.user.id)
        .then(user => res.send(user))
}

module.exports = user