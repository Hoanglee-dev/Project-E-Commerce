import { SuccessResponse } from './utils.type'
import { User } from './user.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
