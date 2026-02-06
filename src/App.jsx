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

//********ADMIN IMPORTS***********/
import TrackPackage from "./Components/Admin Tracking/Track Package/TrackPackage.jsx";
import TrackerGen from "./Components/Admin Tracking/Tracker Generator/TrackGen.jsx";
import UpdateStatus from "./Components/Admin Tracking/Update Status/UpdateStatus.jsx";

//IMPORT REACT-ROOUTER-DOM
import { createBrowserRouter, RouterProvider } from "react-router-dom";


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
  },

  
  //**************ADMIN ROUTER**********//
  {
    path:"/admin.create-package",
    element: <div> <TrackerGen/> </div>
  },
  {
    path:"/admin.track-package",
    element: <div> <TrackPackage/> </div>
  },
  {
    path:"/admin.update-status",
    element: <div> <UpdateStatus/> </div>
  },
])

function App() {

  return (
    <div>
      <RouterProvider router= {router} />
    </div>
  );
}

export default App
