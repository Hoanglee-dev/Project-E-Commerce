import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { data, Link, useNavigate } from 'react-router-dom'
import { login } from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { AppContext } from '~/contexts/app.context'
import { ErrorResponse } from '~/types/utils.type'
import { loginSchema, LoginSchema } from '~/utils/rules'
import { isAxiosErrorUnprocessableEntity } from '~/utils/utils'

type FormData = LoginSchema

export default function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              console.log(key)
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
              <h2 className='text-2xl mb-5'> Đăng nhập</h2>
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

              <div className='mt-2 '>
                <Button
                  className='gap-x-2 w-full  py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center '
                  type='submit'
                  isloading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400 ml-1'> Bạn đã có tài khoản chưa?</span>
                <Link to='/register' className='text-red-400 px-2'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
