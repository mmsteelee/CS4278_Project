import axios from 'axios'
import { BACKEND_URL } from '../constants'

// axios configuration
export const api = axios.create({
  baseURL: BACKEND_URL,
})
