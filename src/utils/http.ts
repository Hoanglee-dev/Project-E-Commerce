import axios, { type AxiosInstance } from 'axios'
import { AuthResponse } from '~/types/auth.type'
import { clearFromLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileUserToLS } from './auth'
import path from '~/constants/path'
class HTTP {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        console.log('🚀 ~ HTTP ~ constructor ~ response:', response)
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileUserToLS(data.data.user)
        } else if (url === path.logout) {
          console.log('logout http')
          this.accessToken = ''
          clearFromLS()
        }
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }
}

const http = new HTTP().instance
export default http
