export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button className={'h-8 px-4 capitalize text-sm  text-center bg-orange hover:bg-orange/80 text-white '}>
            Phổ biến
          </button>
          <button className={'h-8 px-4 capitalize text-sm  text-center bg-gray-100 text-black hover:bg-orange/80  '}>
            Mới nhất
          </button>
          <button className={'h-8 px-4 capitalize  text-sm  text-center bg-gray-100 text-black hover:bg-orange/80  '}>
            Bán chạy
          </button>
          <select
            name=''
            id=''
            className={'h-8 px-4 capitalize outline-none  text-sm t-left hover:bg-orange/80 bg-gray-100 text-black '}
          >
            <option value='' disabled className='text-black bg-white'>
              Giá
            </option>
            <option className='text-black bg-white hover:text-orange'>Giá: Thấp đến cao</option>
            <option className='text-black bg-white'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center gap-0.5'>
          <div className='mr-3'>
            <span className='text-orange'>1</span>
            <span>/9</span>
          </div>
          <button className='relative inline-flex items-center  rounded-l-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5' />
            </svg>
          </button>

          <button className='relative inline-flex items-center  rounded-r-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
