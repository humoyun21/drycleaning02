import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMask } from "@react-input/mask";
import { signUpValidationSchema } from "../../utils/validations"
import { Signup } from "@/src/types/interface/auth";
import { auth } from "@service";
import { SigUpModal } from "@modals";
import "./style.scss"
import { useState } from "react";

const index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const initialValues: Signup = {
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
  }
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ }
  });
  const handleSubmit = async(values: Signup) => {
    setEmail(values.email)
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` }
    try {
      const response = await auth.sign_up(payload);
      response.status === 200 && setModal(true)
      console.log(response);
    }catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <SigUpModal open={modal} handleClose={()=> setModal(false)} email={email}/>
      <div className="h-screen flex-col flex items-center justify-center gap-8 p-5">
        <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">
          Ro'yhatdan o'tish
        </h1>
        <div className="max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="full_name"
                  type="text"
                  as={TextField}
                  label="Ismingizni kiriting"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="full_name" component='span' className="text-[red] text-[15px]" />
                  }
                />
                <Field
                  name="phone_number"
                  type="tel"
                  as={TextField}
                  label="Telefon Raqamingiz"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  inputRef={inputRef}
                  helperText={
                    <ErrorMessage name="phone_number" component='span' className="text-[red] text-[15px]" />
                  }
                />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="email" component='span' className="text-[red] text-[15px]" />
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
                    <ErrorMessage name="password" component='span' className="text-[red] text-[15px]" />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  className="mt-5"
                >
                  {isSubmitting ? "Yuborilmoqda..." : "Ro'yhatdan o'tish"}
                </Button>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default index;