import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'

export default function ProductList() {
  return (
    <div className='bg-[#F5F5F5] py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 '>
          <div className='col-span-2'>
            <AsideFilter />
          </div>
          <div className='col-span-10 pl-3'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 '>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                ))}
              <Product />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
