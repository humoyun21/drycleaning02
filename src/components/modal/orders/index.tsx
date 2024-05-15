import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { InputLabel, Select, TextField } from "@mui/material";
import useOrderStore from "../../../store/orders";
import getServise from '../../../store/service'
import Notification from "@notification";
import { ordersValidationSchema } from "../../../utils/validations";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 1.3,
  boxShadow: 24,
  p: 3,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [services, setServices] = React.useState([]);
  const { postOrder, getOrders } = useOrderStore();
  const { getData } = getServise();
  const [params] = React.useState({
    page: 1,
    limit: 10,
  });
  const initialValues = {
    amount: "",
    client_phonenumber: "",
    cliet_full_name: "",
    service_id: "",
  };
  const postData = async (values: any) => {
    const response = await postOrder(values);
    if (response.status === 201) {
      getOrders(params);
      handleClose();
      Notification({
        title: "Buyurtma muvaffaqiyatli qo'shildi",
        type: "success",
      });
    } else {
      Notification({ title: "Xatolik yuz berdi", type: "error" });
    }
  };
  const getService = async () => {
    const response = await getData(params);
    setServices(response.data.services);
  }
  return (
    <div>
      <div onClick={getService}>
      <Button variant="contained" onClick={handleOpen}>
        Buyurtma qo'shish
      </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            Buyurtma qo'shish
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={ordersValidationSchema}
            onSubmit={postData}
          >
            <Form>
              <Field
                name="amount"
                type="number"
                as={TextField}
                label="Buyurtma miqdori"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="amount"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="client_phonenumber"
                type="text"
                as={TextField}
                label="Mijozning telefon raqami"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="client_phonenumber"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="cliet_full_name"
                type="text"
                as={TextField}
                label="Mijozning to'liq ismi"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="cliet_full_name"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <div>
                <InputLabel id="demo-simple-select-label">Xizmat</InputLabel>
                <Field
                  name="service_id"
                  type="text"
                  as={Select}
                  label="Buyurtma miqdori"
                  fullWidth
                  variant="outlined"
                >
                  {services.map((item: any, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="service_id" component="span" className="text-[red] text-[15px]" />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Qo'shish
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
