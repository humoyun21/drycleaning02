import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInValidationSchema } from "@validation";
import { Signin } from "@auth-interface";
import { SignInModal } from "@modals";
import { auth } from "@service";
import { useNavigate } from "react-router-dom";
import Notification from "../../utils/notification";
import { useState, useEffect } from "react";
import { setDataToCookie } from "@data-service";
import "./style.scss";

const index = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const initialValues: Signin = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values: Signin) => {
    try {
      const response = await auth.sign_in(values);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response?.data?.access_token);
        setDataToCookie("token", response?.data?.access_token);
        setDataToCookie("user_id", response?.data?.id);
          navigate("/");
        Notification({
          title: "Siz muvaffaqiyatli kirdingiz",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Notification({ title: "Xatolik yuz berdi", type: "error" });
    }
  };
  const login = () => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  };
  useEffect(() => {
    login();
  }, []);
  return (
    <>
      <SignInModal
        open={modal}
        handleClose={() => {
          false;
        }}
      />
      <div className="h-screen flex-col flex items-center justify-center gap-8 p-5">
        <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">
          Tizimga kirish
        </h1>
        <div className="max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Parol"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <p
                  className="mb-3 cursor-pointer hover:text-blue-500"
                  onClick={() => setModal(true)}
                >
                  Parolni unutdingizmi?
                </p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  className="mt-5"
                >
                  Kirish
                </Button>
                <p onClick={()=>navigate("/signup")} className="mt-3 cursor-pointer hover:text-blue-500">Ro'yhatdan o'tish</p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default index;