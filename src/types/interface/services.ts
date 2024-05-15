export interface GetParams {
    limit: number,
    page: number,
    owner_id?: string | undefined,
}
export interface post {
    name: string;
    price: number | string;
    owner_id?: string | undefined;
}
export interface UpdateService extends post {
    id: string;
}
export interface ServiceStore {
    data:any[],
    isLoading: boolean,
    getData:(params: GetParams) => Promise<any>,
    postData:(data: post) => Promise<any>
    deleteData:(id: string) => Promise<any>
    updateData:(data: UpdateService) => Promise<any>
}

export interface Request {
    get_services: (params: GetParams) => Promise<any>
    post_services: (params: post) => Promise<any>
    delete_service: (id:string) => Promise<any>
    update_service: (data:UpdateService) => Promise<any>
}