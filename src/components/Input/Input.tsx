import { InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  className?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  classNameEye?: string
}

export default function Input({
  name,
  rules,
  register,
  type = 'text',
  placeholder,
  errorMessage,
  className,
  classNameError = 'mt-1 ml-1 text-red-600 min-h-6 text-sm',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameEye = 'absolute top-[8px] right-[5px] h-5 w-5 cursor-pointer',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  const [openEye, setOpenEye] = useState(false)

  const actualType = type === 'password' ? (openEye ? 'text' : 'password') : type
  const isPasswordType = type === 'password'

  return (
    <div className={className}>
      <input type={actualType} className={classNameInput} placeholder={placeholder} {...rest} {...registerResult} />

      {isPasswordType &&
        (openEye ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={classNameEye}
            onClick={() => setOpenEye((prev) => !prev)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={classNameEye}
            onClick={() => setOpenEye((prev) => !prev)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 
              12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 
              0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 
              01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 
              3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 
              0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
            />
          </svg>
        ))}

      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
