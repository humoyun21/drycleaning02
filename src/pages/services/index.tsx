import GlobalTable from "../../components/ui/table";
import { useEffect, useState } from "react";
import { getDataFromCookie } from "@data-service";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../../components/modal/services";
import useServiceStore from "../../store/service";
const index = () => {
  const { getData, data, isLoading } = useServiceStore();
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const [params] = useState({
    page: 1,
    limit: 10,
    owner_id: getDataFromCookie("user_id"),
  });
  
  useEffect(() => {
    getData(params);
  }, [params, getData]);
  const headers = [
    { title: "№", value: "index" },
    { title: "Xizmat nomi", value: "name" },
    { title: "Xizmat narxi", value: "price" },
    { title: "", value: "action" },
  ];
  const editItem = (item: any) => {
    setModal(true);
    setItem(item);
  }
  const handleClose = () => {
    setModal(false);
    setItem({});
  }
  return (
    <div>
      {modal && <Modal open={modal} handleClose={handleClose} item={item}/>}
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
        <Button variant="contained" color="primary" onClick={()=>setModal(true)}>
        Xizmat qo'shish
      </Button>
      </div>
      <GlobalTable
        headers={headers}
        body={data}
        isLoading={isLoading}
        editItem={editItem}
      />
    </div>
  );
};

export default index;