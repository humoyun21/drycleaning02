import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
const theme = createTheme()
const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer/>
        <Outlet/>
      </ThemeProvider>
    </>
  );
};

export default App;