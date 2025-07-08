import axios from 'axios'

import { LOCAL_ACCESS_TOKEN_KEY } from '@/constants/local-storage'

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return request
  }

  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})
