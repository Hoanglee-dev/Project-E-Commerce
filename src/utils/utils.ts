import axios, { AxiosError, HttpStatusCode } from 'axios'
import userImage from '../assets/svg/user.svg'
import config from '~/constants/config'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosErrorUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

export const getAvatarUrl = (avatarName?: string) => {
  if (avatarName === undefined || avatarName == `${config.baseUrl}images/${undefined}`) {
    return userImage
  } else {
    return avatarName
  }
}
