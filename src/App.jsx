import Home from "./Components/HomePage/Home.jsx";
import Register from "./Components/RegisterPage/Register.jsx";
import Login from "./Components/LoginPage/Login.jsx";
import Dashboard from "./Components/DashboardPage/Dashboard.jsx";
import SideBar from "./Components/DashboardPage/SideBarPart/SideBar.jsx";
import Complaint from "./Components/ComplaintPage/Complaint.jsx";
import Bicycle from "./Components/BicyclePage/Bicycle.jsx";
import Motobike from "./Components/MotoBikePage/Motobike.jsx";
import Bus from "./Components/BusPage/Bus.jsx";
import Track from "./Components/Track Package/Track.jsx";



//IMPORT REACT-ROOUTER-DOM
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Order from "./Components/OrderPage/Order.jsx";


//CREATING A ROUTER
const router = createBrowserRouter([
  {
  path:"/",
  element: <div> <Home/> </div>
  },
  {
  path:"/register",
  element: <div> <Register/> </div>
  },
  {
  path:"/login",
  element: <div> <Login/> </div>
  },
  {
  path:"/dashboard",
  element: <div> <Dashboard/> </div>
  },
  {
    path:"/complaint",
    element: <div> <Complaint/> </div>
  },
  {
    path: "/bicycle",
    element: <div> <Bicycle/> </div>
  },
  {
    path: "/motobike",
    element: <div> <Motobike/> </div>
  },
  {
    path: "/bus",
    element: <div> <Bus/> </div>
  },
  {
    path: "/sideBar",
    element: <div> <SideBar/> </div>
  },
  {
    path: "/trackpackage",
    element: <div> <Track/> </div>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router= {router} />
    </div>
  );
}

export default App
