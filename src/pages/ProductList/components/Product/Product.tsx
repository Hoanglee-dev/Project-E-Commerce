import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to={'/'}>
      <div className='h-full  rounded-md overflow-hidden bg-white shadow-sm hover:translate-y-[-0.065rem] hover:shadow-md duration-100 transition-transform '>
        <div className='w-full pt-[100%] relative'>
          <img
            className=' absolute top-0 left-0 bg-white w-full h-full object-cover'
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lrsmvmor7r9g15.webp'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>
            Thắt Lưng Nam Khóa Tự Động Cao Cấp Mặt Xoay Chính Hãng , Dây Nịt Nam Phong Cách Hàn Quốc
          </div>

          <div className='mt-2 pointer-events-none overflow-hidden h-4 flex-grow-0 flex-shrink-1 flex flex-row justify-start items-stretch'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='flex-none h-full -mr-px'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth={1}
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
            <div className='truncate bg-[#F69113] text-white leading-4 text-xs  px-px'>Giảm ₫1k</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='-0.5 -0.5 4 16'
              className='rotate-180 flex-none h-full -ml-px'
            >
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth={1}
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
          </div>
          <div className='mb-2 mt-2 flex items-center justify-between space-x-1'>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>1000</span>
            </div>

            <div className='truncate text-shopee-black87 text-sm min-h-4 text-center'>Đã bán</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
