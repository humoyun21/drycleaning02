import GlobalTable from "../../components/ui/table";
import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrderModal } from "@modals";
import useOrderStore from "../../store/orders";
const index = () => {
  const { getOrders, data, isLoading } = useOrderStore();
  const [params] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    getOrders(params);
  }, [params, getOrders]);
  const headers = [
    { title: "№", value: "index" },
    { title: "Buyurtma miqdori", value: "amount" },
    { title: "Buyurma narxi", value: "price" },
    { title: "", value: "action" },
  ];
  return (
    <div>
      <div className="py-3 flex justify-between items-center">
        <div className="w-96">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "400",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Qidiruv"
              inputProps={{ "aria-label": "Search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <OrderModal />
      </div>
      <GlobalTable
        headers={headers}
        body={data}
        isLoading={isLoading}
        editItem={() => {}}
      />
    </div>
  );
};

export default index;
