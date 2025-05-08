import { AuthResponse } from './auth.type'
export interface ResponseApi<Data> {
  message: string
  data?: Data
}
