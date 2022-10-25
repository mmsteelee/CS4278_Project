const Account = require('../../models/Account')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const login = async (req, res) => { 
  const googleAccessToken = req.body.accessToken;
  axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${googleAccessToken}`
        }
  }).then(async response => {
    const firstName = response.data.given_name;
    const lastName = response.data.family_name;
    const email = response.data.email;
    const picture = response.data.picture;

    if (email.split('@')[1].toLowerCase() !== 'vanderbilt.edu') {
      console.log('Invalid Email Domain: ' + email)
      return res.status(200).json({message: "Invalid Email Domain"})
    }

    const existingUser = await Account.findOne({email})

    if (existingUser) {
      const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id
      }, process.env.JWT_SECRET, {expiresIn: "1h"})

      console.log('Existing user: ' + existingUser)
      
      res
        .status(200)
        .json({result: existingUser, token})
    } else {
      const result = await Account.create({verified:"true",email, firstName, lastName, picture: picture, role:"user"})

      const token = jwt.sign({
          email: result.email,
          id: result._id
      }, process.env.JWT_SECRET, {expiresIn: "1h"})

      console.log('New user: ' + result)

      res
        .status(200)
        .json({result, token})

      console.log(res)
    }
  }).catch(err => {
    console.log('Error: ' + err)
    res
      .status(400)
      .json({message: "Invalid access token!"})
  })
}

module.exports = login
