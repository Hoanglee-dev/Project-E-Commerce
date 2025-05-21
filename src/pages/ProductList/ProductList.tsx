import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import { useQueryParams } from '~/hooks/useQueryParam'
import productApi from '~/apis/product.api'
import Pagination from '~/components/Pagination/Pagination'
import { ProductListConfig } from '~/types/product.type'
import { isUndefined, omitBy } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 5,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  console.log('🚀 ~ ProductList ~ queryConfig:', queryConfig)
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
  console.log(data)
  return (
    <div className='bg-[#F5F5F5] py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 '>
            <div className='col-span-2'>
              <AsideFilter />
            </div>
            <div className='col-span-10 pl-3'>
              <SortProductList />
              <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 '>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination totalPage={data.data.data.pagination.page_size} queryConfig={queryConfig} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
