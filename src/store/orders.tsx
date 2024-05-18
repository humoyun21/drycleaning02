import { create } from "zustand";
import { orders } from "@service";
import { OrderStore } from "../types/interface/order";

const useOrderStore = create<OrderStore>((set) => ({
  data: [],
  isLoading: false,
  totalCount: 1,
  getOrders: async (params) => {
    try {
      set({ isLoading: true });
      const response = await orders.get_orders(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.total / params.limit),
          data: response?.data?.orders_list,
        })
      }
      set({ isLoading: false });
    } catch (error) {
      console.error(error);
    }
  },
  postOrder: async (data) => {
    try {
      const response = await orders.post_order(data);
      if (response.status === 201) {
        set((state) => ({
          data:
            state?.data?.length < 10
              ? [...state.data, response.data]
              : [...state.data],
        }));
      }
      return response.status;      
    } catch (error) {
      console.error(error);
    }
  },
  deleteOrder: async (id) => {
    try {
      const response = await orders.delete_order(id);
      if (response.status === 200) {
        set((state) => ({
          data: state.data.filter((item: any) => item.id!== id),
        }));
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}));
export default useOrderStore;
