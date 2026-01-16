import "./Loading.css";
import { MdOutlineElectricBike } from "react-icons/md";


function Loading() {
    return (
        <div className="loadingView">
            <div className="loadingContainer">
                <div className="firstSmoke"></div>
                <div className="secondSmoke"></div>
                <div className="thirdSmoke"></div>
                <MdOutlineElectricBike/>    
            </div>
        </div>
    );
}


export default Loading;