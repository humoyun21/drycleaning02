import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { Field, Formik } from "formik";
// import { Form } from "react-router-dom";
import { TextField } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { servicesValidationSchema } from "@validation";
import { post } from "../../../types/interface/services";
import useServiceStore from "../../../store/service";
import { getDataFromCookie } from "@data-service";
import Notification from "../../../utils/notification";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 1.3,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, item }: any) {
  const { postData, updateData } = useServiceStore();
  const initialValues: post = {
    name: item.name || "",
    price: item.price || "",
  };
  const handleSubmit = async (values: post) => {
    const payload = {
      ...values,
      price: Number(values.price),
      owner_id: getDataFromCookie("user_id"),
    };
    if (!item.id) {
      const status = await postData(payload);
      if (status === 201) {
        handleClose();
        Notification({
          title: "Xizmat muvaffaqiyatli qo'shildi",
          type: "success",
        });
      } else {
        Notification({ title: "Xatolik yuz berdi", type: "error" });
      }
    } else {
      const status = await updateData({...payload, id: item.id });
      if (status === 200) {
        handleClose();
        Notification({
          title: "Xizmat nomi o'zgartirildi",
          type: "success",
        });
      }
    }
    console.log(item);
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            Xizmat qo'shish
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={servicesValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                name="name"
                type="text"
                as={TextField}
                label="Xizmat nomi"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="price"
                type="number"
                as={TextField}
                label="Xizmat narxi"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="price"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
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
