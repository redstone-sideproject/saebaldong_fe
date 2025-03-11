import axios from 'axios'

const publicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export default publicAPI
