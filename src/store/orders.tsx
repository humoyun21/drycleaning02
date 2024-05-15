import { create } from "zustand";
import { orders } from "@service";
import { OrderStore } from "../types/interface/order";

const useOrderStore = create<OrderStore>((set) => ({
  data: [],
  isLoading: false,
  getOrders: async (params) => {
    try {
      set({ isLoading: true });
      const response = await orders.get_orders(params);
      if (response.status === 200) {
        response?.data?.orders_list?.forEach((item: any, index: number) => {
          item.index = index + 1;
        });
        set({ data: response?.data?.orders_list });
      }
      set({ isLoading: false });
    } catch (error) {
      console.error(error);
    }
  },
  postOrder: async (data) => {
    try {
      const response = await orders.post_order(data);
      return response;      
    } catch (error) {
      console.error(error);
    }
  },
}));
export default useOrderStore;