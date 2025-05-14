import { Link } from 'react-router-dom'
import { Product as ProductType } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '~/utils/utils'
import ProductRating from '../ProductRating'

interface Props {
  product: ProductType
}

export default function Product(product: Props) {
  const { image, name, price_before_discount, price, sold, rating } = product.product
  return (
    <Link to={'/'}>
      <div className='h-full  rounded-md overflow-hidden bg-white shadow-sm hover:translate-y-[-0.065rem] hover:shadow-md duration-100 transition-transform '>
        <div className='w-full pt-[100%] relative'>
          <img className=' absolute top-0 left-0 bg-white w-full h-full object-cover' src={image} />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>{name}</div>
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
              {/* <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1'>
                <defs>
                  <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                    <stop offset={0} stopColor='#ffca11' />
                    <stop offset={1} stopColor='#ffad27' />
                  </linearGradient>
                  <polygon
                    id='ratingStar'
                    points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                  />
                </defs>
                <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                  <g transform='translate(-876 -1270)'>
                    <g transform='translate(155 992)'>
                      <g transform='translate(600 29)'>
                        <g transform='translate(10 239)'>
                          <g transform='translate(101 10)'>
                            <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg> */}
              <ProductRating rating={rating} />
              {/* <p className='text-sm'>{rating}</p> */}
            </div>
            Đã bán {formatNumberToSocialStyle(sold)}
          </div>
        </div>
      </div>
    </Link>
  )
}
