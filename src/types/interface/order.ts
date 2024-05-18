export interface GetParams {
    page: number,
    limit: number,
}
export interface post {
    amount: number | string,
    client_phonenumber: string,
    cliet_full_name: string,
    service_id: string,
}

export interface Request {
    get_orders: (params: GetParams) => Promise<any>
    post_order: (data: any) => Promise<any>
    delete_order: (id:string) => Promise<any>
    // update_service: (data:UpdateService) => Promise<any>
}

export interface OrderStore {
    data:any[],
    isLoading: boolean,
    totalCount: number,
    getOrders:(params: GetParams) => Promise<any>,
    postOrder:(data: any) => Promise<any>
    deleteOrder:(id: string) => Promise<any>
}