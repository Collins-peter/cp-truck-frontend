import "./Bicycle.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import bicycleIcon from "../../assets/bicycleDispatch.png";
import Loading from "../LoadingPage/Loading";
import Order from "../OrderPage/Order";

import VerifyMiddleware from "../../services/VerifyMiddleware";

function Bicycle() {
    console.log("Bicycle page connected...")

    VerifyMiddleware();       

    //HANDLING LOADING PAGE
     const [ loadingpage, setLoadingpage ] = useState(false);

        const loadHandler = () => {
            //APPLYING LOADING PAGE////////
            if (!loadingpage) {
                setLoadingpage(true);
            }

            const loadProcess = () => {
                setLoadingpage(false);
            }
            setTimeout(loadProcess, 5000);
            
        }
     //CONDITIONS TO APPLY LOADING PAGE
        if (loadingpage) {
            return (
                <Loading/>
            )
        }




    return(
        <div className="bicycleView">
            <div className="bicycleContainer">
                <span className="dashIcon">
                    <Link to="/dashboard" onClick={loadHandler}><MdDashboard/></Link>
                </span>
                <span className="icon"><img src={bicycleIcon} alt="bicycle ride" /></span>

                <Order/>
            </div>
        </div>
    );
}

export default Bicycle;