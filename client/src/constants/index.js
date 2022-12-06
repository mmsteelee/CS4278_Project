// api url (where your server is hosted at)
const production = true;

const BACKEND_URL = production ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:8080'
const IMAGE_UPLOAD_PRESET = 'ip5kvkrl'

export {
  BACKEND_URL,
  IMAGE_UPLOAD_PRESET
}
