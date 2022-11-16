// api url (where your server is hosted at)
const production = false;

const BACKEND_URL = production ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:8080'

export {
  BACKEND_URL,
}
