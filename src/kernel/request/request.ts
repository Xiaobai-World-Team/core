import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const request = axios.create()

request.interceptors.request.use(((config: AxiosRequestConfig) => {
  return config
}))

request.interceptors.response.use((response: AxiosResponse) => {
  return response
}, (error) => {
  return Promise.reject(error.response)
})

