import request from '../config'
import { Request } from '../../types/interface/order'
const orders: Request = {
    get_orders: (params) => request.get('/order/all', {params}),
    post_order: (data) => request.post('/order', data),
}

export default orders;