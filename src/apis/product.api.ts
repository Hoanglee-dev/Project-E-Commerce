import { SuccessResponse } from './../types/utils.type'
import { Product, ProductList, ProductListConfig } from '~/types/product.type'
import http from '~/utils/http'

const URL = 'products'
const productApi = {
  getProductList: (params: ProductListConfig) => {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail: (productId: string) => {
    return http.get<SuccessResponse<Product>>(`${URL}/${productId}`)
  }
}

export default productApi
