import axios from 'axios'
import { AuthResponse } from '~/utils/auth.type'
import http from '~/utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
