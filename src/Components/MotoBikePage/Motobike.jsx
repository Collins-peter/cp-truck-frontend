import "./Motobike.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import MotobikeIcon from "../../assets/motoBike.png";
import Loading from "../LoadingPage/Loading";
import Order from "../OrderPage/Order";
import VerifyMiddleware from "../../services/VerifyMiddleware";

function Motobike() {
    console.log("Bicycle page connected...")

    VerifyMiddleware();

    
    //HANDLING LOADING PAGE
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



    return(
        <div className="motobikeView">
            <div className="motobikeContainer">
                <span className="dashIcon">
                    <Link to="/dashboard" onClick={loadHandler}><MdDashboard/></Link>
                </span>
                <span className="icon"><img src={MotobikeIcon} alt="motobike ride" /></span>
                
                <Order/>
            </div>
        </div>
    );
}

export default Motobike;