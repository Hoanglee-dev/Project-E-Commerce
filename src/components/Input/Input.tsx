import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  className?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
}

export default function Input({
  name,
  rules,
  register,
  type,
  placeholder,
  errorMessage,
  className,
  classNameError = 'mt-1 ml-1 text-red-600 min-h-6 text-sm',
  classNameInput = ' p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} placeholder={placeholder} type={type} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
