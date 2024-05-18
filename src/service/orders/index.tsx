import request from '../config'
import { Request } from '../../types/interface/order'
const orders: Request = {
    get_orders: (params) => request.get('/order/all', {params}),
    post_order: (data) => request.post('/order', data),
    delete_order: (id) => request.delete(`/order?id=${id}`),
    // update_service: (data:UpdateService) => request.put("/order", data),
}

export default orders;