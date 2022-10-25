const dotenv = require('dotenv')

dotenv.config();

const deployedUrl = "TODO"

function getBaseUrl(client = true){
    return process.env.NODE_ENV === "production" ? deployedUrl : client ? "http://localhost:3000" : "http://localhost:8080"
}

module.exports = getBaseUrl;