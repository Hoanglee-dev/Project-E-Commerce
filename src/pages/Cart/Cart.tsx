import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import { purchasesStatus } from '~/constants/purchase'
import { formatCurrency } from '~/utils/utils'

export default function Cart() {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.productInCart }],
    queryFn: () => purchaseApi.getListPurchase({ status: purchasesStatus.productInCart }),
    staleTime: 2 * 60 * 1000
  })

  const purchasesInCart = purchasesInCartData?.data.data
  console.log('🚀 ~ Cart ~ purchasesInCart:', purchasesInCart)
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input type='checkbox' className='h-5 w-5 accent-orange' />
                    </div>
                    <div className='flex-grow text-black'>Sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>Đơn giá</div>
                    <div className='col-span-1'>Số lượng</div>
                    <div className='col-span-1'>Số tiền</div>
                    <div className='col-span-1'>Thao tác</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {purchasesInCart?.map((purchase) => (
                  <div
                    key={purchase._id}
                    className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input type='checkbox' className='h-5 w-5 accent-orange' />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link className='h-20 w-20 flex-shrink-0' to={'/'}>
                              <img alt={purchase.product.name} src={purchase.product.image} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2'>
                              <Link to={'/'} className='text-left line-clamp-2'>
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              ₫{formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='flex items-center'
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>
                            ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input type='checkbox' className='h-5 w-5 accent-orange' />
              </div>
              <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
              <button className='mx-3 border-none bg-none'>Xóa</button>
            </div>

            <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
              <div>
                <div className='flex items-center sm:justify-end'>
                  <div>Tổng thanh toán sản phẩm</div>
                  <div className='ml-2 text-2xl text-orange'>₫100</div>
                </div>
                <div className='flex items-center text-sm sm:justify-end'>
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className='ml-6 text-orange'>₫10</div>
                </div>
              </div>
              <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
                Mua hàng
              </Button>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
