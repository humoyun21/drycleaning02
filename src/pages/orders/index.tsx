import GlobalTable from "../../components/ui/table";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrderModal } from "@modals";
import useOrderStore from "../../store/orders";
import Notification from "@notification";
import { useNavigate } from "react-router-dom";
const index = () => {
  const { getOrders, data, isLoading, deleteOrder, totalCount } = useOrderStore();
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const deleteItem = async (id: any) => {
    const response = await deleteOrder(id);
    if (response.status === 200) {
      Notification({
        title: "Buyurtma muvaffaqiyatli o'chirildi",
        type: "success",
      })
    }
  }

  useEffect(() => {
    getOrders(params);
  }, [params, getOrders]);
  useEffect(()=> {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1
    setParams(prevParams => ({
      ...prevParams,
      page: pageNumber
    }))
  }, [location.search])
  const handleChange = (event: React.ChangeEvent<unknown>, value:number) => {
    console.log(event);
    setParams(prevParams=> ({
      ...prevParams,
      page: value
    }))
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", `${value}`);
    navigate(`/orders?${searchParams}`)
  }
  const headers = [
    { title: "№", value: "index" },
    { title: "Mijoz ismi", value: "client_name" },
    { title: "Xizmat nomi", value: "service_name" },
    { title: "Buyurma narxi", value: "price" },
    { title: "Buyurtma miqdori", value: "amount" },
    { title: "Buyurtma statusi", value: "status" },
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
        deleteItem={deleteItem}
      />
      <Stack spacing={2}>
        <Pagination count={totalCount} page={params.page} onChange={handleChange}/>
      </Stack>
    </div>
  );
};

export default index;
