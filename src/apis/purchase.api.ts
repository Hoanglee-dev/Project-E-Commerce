import { Purchase, PurchaseListStatus } from '~/types/purchase.type'
import { SuccessResponse } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getListPurchase: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponse<Purchase[]>>(URL, {
      params
    })
  },
  buyProducts: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  deletePurchases: (purchaseIds: string[]) => {
    return http.delete(`${URL}`, {
      data: purchaseIds
    })
  },
  updatePurchase: (Body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, Body)
  }
}
export default purchaseApi
