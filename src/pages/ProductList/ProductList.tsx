import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import productApi from '~/apis/product.api'
import Pagination from '~/components/Pagination/Pagination'
import { ProductListConfig } from '~/types/product.type'
import useQueryConfig from '~/hooks/useQueryConfig'
import categoryApi from '~/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryConfig: QueryConfig = useQueryConfig()
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
  return (
    <div className='bg-[#F5F5F5] py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 '>
            <div className='col-span-2'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-10 pl-3'>
              <SortProductList queryConfig={queryConfig} totalPage={productData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 '>
                {productData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination totalPage={productData.data.data.pagination.page_size} queryConfig={queryConfig} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
