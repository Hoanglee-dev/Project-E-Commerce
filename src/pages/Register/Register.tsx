import React from 'react'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import Input from '~/components/Input'
import { schema, registerSchema } from '~/utils/rules'

type FormData = registerSchema

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  console.log('🚀 ~ Register ~ errors:', errors)
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
                <button
                  className='gap-x-2 w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  type='submit'
                >
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400 ml-1'> Bạn đã có tài khoản chưa?</span>
                <Link to='/login' className='text-red-400 px-2'>
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
