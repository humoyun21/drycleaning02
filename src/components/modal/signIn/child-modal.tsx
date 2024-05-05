import {
  Box,
  Modal,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ModalProps } from "@global-interface";
import { updatePassValidationSchema } from "@validation";
import { UpdatePassword } from "@auth-interface";
import { useEffect, useState } from "react";
import { auth } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  pt: 2,
  pb: 3,
  px: 4,
};
interface ImodalProps extends ModalProps {
  email: string;
}
export default function ChildModal({ open, handleClose, email }: ImodalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const initialValues:UpdatePassword = {
    code: "",
    new_password: "",
  };
  useEffect(()=> {
    let timer = null;
    if (open) {
      timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    }
  }, [open])
  useEffect(() => {
    if (secondsLeft === 0) {
      handleClose();
    }
  }, [secondsLeft, handleClose])
  const handleSubmit = async (values: UpdatePassword) => {
    const payload = {...values, email };
    try {
        const response = await auth.update_password(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-deskription"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Typography
            id="keep-mounted-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            Parolni tiklash
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={updatePassValidationSchema}
          >
            <Form>
              <Field
                name="code"
                type="text"
                as={TextField}
                label="Kod"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="code"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="new_password"
                type={showPassword ? "text" : "password"}
                as={TextField}
                label="Yangi Parol"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="new_password"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography>
                {`Time left: ${secondsLeft} seconds`}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Tasdiqlash
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
