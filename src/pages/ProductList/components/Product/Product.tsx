import { Link } from 'react-router-dom'
import { Product as ProductType } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from '~/utils/utils'
import ProductRating from '../ProductRating'
import path from '~/constants/path'

interface Props {
  product: ProductType
}

export default function Product(product: Props) {
  const { image, name, price_before_discount, price, sold, rating } = product.product
  return (
    <Link to={`${path.home}${product.product._id}`}>
      <div className='h-full  rounded-md overflow-hidden bg-white shadow-sm hover:translate-y-[-0.065rem] hover:shadow-md duration-100 transition-transform '>
        <div className='w-full pt-[100%] relative'>
          <img className=' absolute top-0 left-0 bg-white w-full h-full object-cover' src={image} />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm mb-1.5'>{name}</div>
          <div className='h-4 overflow-hidden max-w-full flex flex-row justify-start items-stretch'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='flex-none h-full -mr-px'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth={1}
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
            <div
              className='truncate  text-white leading-4 text-[10px] px-px'
              style={{ color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(246, 145, 19)' }}
            >
              {rateSale(price_before_discount, price)} Giảm
            </div>
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
          <div className='mb-2 mt-2 flex items-center  space-x-1'>
            <div className=' line-through max-w-[50%] text-sm text-gray-500 truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-1 text-sm'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(price)}</span>
            </div>
          </div>
          <div className='truncate text-shopee-black87 flex justify-between items-center text-sm  min-h-4 '>
            <div className='flex'>
              <ProductRating rating={rating} />
            </div>
            Đã bán {formatNumberToSocialStyle(sold)}
          </div>
        </div>
      </div>
    </Link>
  )
}
