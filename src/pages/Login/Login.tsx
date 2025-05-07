import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto py-5'>
        <div className=' grid grid-cols-1 px-5 lg:grid-cols-12 lg:py-11 lg:pr-16 '>
          <div className='lg:col-span-4'></div>
          <div className='lg:col-span-4 lg:col-start-8'>
            <form className='bg-white shadow-sm p-8 rounded' noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <input name='email' className='mt-8' placeholder='Email' type='email' />
              <input name='password' className='mt-3' placeholder='password' type='password' />
              <div className='mt-3 '>
                <button className='gap-x-2 w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'>
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'> Bạn đã có tài khoản chưa?</span>
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
