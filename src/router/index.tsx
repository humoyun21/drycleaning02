import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "../App";

import { Home, SignIn, SginUp, Dashboard, Orders, Service, Client } from "../pages";

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="/" element={<Home/>}>
              <Route index element={<Dashboard/>}/>
              <Route path="orders" element={<Orders/>}/>
              <Route path="services" element={<Service/>}/>
              <Route path="clients" element={<Client/>}/>
            </Route>
            <Route path="/signup" element={<SginUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
        </Route>
    )
  )
  return <RouterProvider router={router}/>
}

export default index
