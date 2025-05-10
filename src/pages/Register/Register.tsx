import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from '~/components/Input'
import { RegisterSchema, schema } from '~/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '~/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosErrorUnprocessableEntity } from '~/utils/utils'
import { ErrorResponse } from '~/types/utils.type'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import Button from '~/components/Button'
import path from '~/constants/path'

type FormData = RegisterSchema

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, 'confirm_password')
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            console.log('🚀 ~ onSubmit ~ formError:', formError.email)
            Object.keys(formError).forEach((key) => {
              console.log(key)
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-red'>
      <div className='container py-2.5 '>
        <div className='grid grid-cols-1 px-20 lg:grid-cols-12 lg:py-11'>
          <div className='lg:col-span-7 bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7reox-m8yiydanxgiv2e")]'></div>
          <div className=' lg:col-span-5 lg:col-start-8'>
            <form className='bg-white shadow-sm p-8 rounded' onSubmit={onSubmit} noValidate>
              <h2 className='text-2xl mb-5'>Đăng ký</h2>
              <Input
                name='email'
                register={register}
                placeholder='Email'
                type='Email'
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                register={register}
                placeholder='Password'
                type='Password'
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirm_password'
                register={register}
                placeholder='Confirm password'
                type='Password'
                errorMessage={errors.confirm_password?.message}
              />

              <div className='mt-2'>
                <Button
                  className='gap-x-2 w-full  py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center '
                  type='submit'
                  isloading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400 ml-1'> Bạn đã có tài khoản chưa?</span>
                <Link to={path.login} className='text-red-400 px-2'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
