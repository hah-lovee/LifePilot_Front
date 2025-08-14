
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || localStorage.getItem('lp_api') || 'http://localhost:8000'

export const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lp_token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
