import "./Track.css";
import { useState } from "react";
import { authService } from "../../services/api";


function Track() {
    const [ trackingNumber, setTrackingNumber ] = useState("");
    const [ packageData, setPackageData ] = useState(null);
    const [ success, setSuccess ] = useState("");
    const [ error, setError ] = useState("");

    const handleTrack = async(e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setPackageData(null);
        
        if (!trackingNumber) {
            setError("Please enter tracking number");
            return;
        }

        try {
            const result = await authService.trackingPackage(trackingNumber);

            if (result.success) {
                setPackageData(result.data);
                setSuccess(result.message);
            } else {
                setError(result.error);
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleOk = async() => {
        setTrackingNumber("");
        setPackageData(null);
        setError("");
        setSuccess("");
    }


    return (
        <div className="trackView">
            {packageData && (
                    <div className="packageDetails">
                        <div className="detailsContainer">
                            <p><strong>Tracking Number:</strong><span>{packageData.tracking_number}</span></p>
                            <p><strong>Sender Name:</strong><span>{packageData.sender_name}</span></p>
                            <p><strong>Receiver Name:</strong><span>{packageData.receiver_name}</span></p>
                            <p><strong>Description:</strong><span>{packageData.description}</span></p>
                            <p><strong>Status:</strong><span>{packageData.status}</span></p>
                            <button onClick={handleOk}>ok</button>
                        </div>
                    </div>
            )}

            <div className="trackContainer">

                <h4>
                    <div>Track Package</div>
                </h4>
                <form onSubmit={handleTrack}>
                    <div>
                        <label htmlFor="trackingNumber">Enter Tracking Number</label>
                        <input type="text" name="trackingNumber" value={trackingNumber} 
                            onChange={e => setTrackingNumber(e.target.value)} required/>
                    </div>
                    {success && (
                        <div className="successMsg">{success}</div>
                    )}

                    {error && (
                        <div className="errorMsg">{error}</div>
                    )}

                    <button type="submit">Track Package</button>
                </form>
            </div>

        </div>
    )
}

export default Track;