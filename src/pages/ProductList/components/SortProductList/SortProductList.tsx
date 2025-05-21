import classNames from 'classnames'
import { ProductListConfig } from '~/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { QueryConfig } from '~/hooks/useQueryConfig'
import { sortBy, order as constantOrder } from '~/constants/product'

interface Props {
  queryConfig: QueryConfig
  totalPage: number
}
export default function SortProductList({ queryConfig, totalPage }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.view, order } = queryConfig
  const navigate = useNavigate()
  const isActiceSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOder = (oderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: oderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 capitalize text-sm  text-center', {
              'bg-orange hover:bg-orange/80  text-white': isActiceSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiceSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize  text-sm  text-center', {
              'bg-orange hover:bg-orange/80 text-white ': isActiceSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiceSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 capitalize  text-sm  text-center', {
              'bg-orange hover:bg-orange/80 text-white ': isActiceSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiceSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            name=''
            id=''
            value={order || ''}
            className={classNames('h-8 px-4 capitalize outline-none  text-sm t-left ', {
              ' hover:bg-orange/80 bg-orange text-white ': isActiceSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-200': !isActiceSortBy(sortBy.price)
            })}
            onChange={(event) => handlePriceOder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='text-black bg-white'>
              Giá
            </option>
            <option value={constantOrder.asc} className='text-black bg-white hover:text-orange'>
              Giá: Thấp đến cao
            </option>
            <option value={constantOrder.desc} className='text-black bg-white'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center gap-0.5'>
          <div className='mr-3'>
            <span className='text-orange'>{page}</span>
            <span>/{totalPage}</span>
          </div>
          {page === 1 ? (
            <button className='relative inline-flex items-center  rounded-l-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5'
                />
              </svg>
            </button>
          ) : (
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='relative bg-white inline-flex items-center rounded-l-md px-2 text-black py-2  ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5'
                />
              </svg>
            </Link>
          )}

          {page === totalPage ? (
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
          ) : (
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className='relative bg-white inline-flex items-center rounded-r-md px-2 text-black py-2  ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
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
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
