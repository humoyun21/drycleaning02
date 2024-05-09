import request from '../config'
import { Request } from '@/src/types/interface/services'
const services: Request = {
    get_services: (params) => request.get('/service/all', {params}),
    post_services: (payload) => request.post('/service', payload),
    delete_service: (id) => request.delete(`/service?id=${id}`),
    update_service: (data:any) => request.put("/service", data),
}
export default services;