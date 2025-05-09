export const setAccessTokenToLS = (accessToken: string) => {
  return localStorage.setItem('access_token', accessToken)
}

export const clearAccessTokenFromLS = () => {
  console.log('clear access')
  localStorage.removeItem('access_token')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
