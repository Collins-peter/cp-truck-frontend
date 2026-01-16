import "./Dashboard.css";
import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io"
import lagosMap from "../../assets/lagosNigeria.png";
import nigeriaMap from "../../assets/nigeriaMap.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingPage/Loading";
import bicycleImage from "../../assets/bicycleDispatch.png";
import bikeImage from "../../assets/motoBike.png";
import busImage from "../../assets/bus.png";

import VerifyMiddleware from "../../services/VerifyMiddleware";
import SideBar from "./SideBarPart/SideBar";
import Track from "../Track Package/Track";



function Dashboard() {
    console.log("dashboard connected...");

    const [ track, setTrack ] = useState(null);

    const handleTrack = async() => {
        setTrack(<Track/>)
    }

    const handleCancel = async() => {
        setTrack(null);
    }

    VerifyMiddleware();

    //MAP SLIDE FUNCTION
        const image1Ref = useRef(null);
        const image2Ref = useRef(null);
        const indexRef = useRef(0)

        const slideChange = () => {
            if (indexRef.current === 0) {
                image1Ref.current.classList.remove("active");
                image2Ref.current.classList.add("active");
                indexRef.current = 1;
            } else {
                image1Ref.current.classList.add("active");
                image2Ref.current.classList.remove("active");
                indexRef.current = 0
            }
        }
        //USE-EFFECT TO NAVIGATE SLIDECHANGE DURATION (3 secs)
        useEffect(() => {
            const interval = setInterval(slideChange, 3000);

            return () => clearInterval(interval);
        }, []);


    //LOADING PAGE HANDLER FOR BUTTONS
        const [ loadingpage, setLoadingpage ] = useState(false);

        const loadHandler = () => {
            //APPLYING LOADING PAGE////////
            setLoadingpage(true);

            const loadProcess = () => {
                setLoadingpage(false)
            }

            setTimeout(loadProcess, 10000);
            
        }
        //CONDITIONS TO APPLY LOADING PAGE
        if (loadingpage) {
            return (
                <Loading/>
            )
        }

     
    return (
        <div className="dashboardView">
            <SideBar/>
            <div className="dashboardContainer">
                <p> 
                    <span className="dashIcon"><MdDashboard/>DashBoard</span>
                    <Link onClick={handleTrack}>Track Package</Link>
                </p>
                <div className="areaImage">
                    <img ref={image1Ref} className="active" src={lagosMap} alt="" />
                    <img ref={image2Ref} src={nigeriaMap} alt="" />
                </div>

                <div className="dashBody">
                    <div className="newReq"><Link to="/complaint" onClick={loadHandler}><FaPlus/>Complaint Service</Link></div>
                    <div className="bicycleReq"><Link to="/bicycle" onClick={loadHandler}> <img src={bicycleImage} alt="bicycleImage" /> </Link></div>
                    <div className="bikeReq"><Link to="/motobike" onClick={loadHandler}> <img src={bikeImage} alt="bikeImage" /> </Link></div>
                    <div className="busReq"><Link to="/bus" onClick={loadHandler}> <img src={busImage} alt="busImage" /> </Link></div>
                </div>
            </div>
            {track && (
                <div className="track">
                    <nav> <span onClick={handleCancel}><IoMdArrowRoundBack/></span> </nav>
                    {track}
                </div>
            )}
        </div>
    );

}

export default Dashboard;
