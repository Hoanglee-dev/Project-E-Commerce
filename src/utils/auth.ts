import { User } from '~/types/user.type'

export const setAccessTokenToLS = (accessToken: string) => {
  return localStorage.setItem('access_token', accessToken)
}

export const clearFromLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const setProfileUserToLS = (profile: User) => {
  return localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileUserFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
