import "./SideBar.css";

import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Track from "../../Track Package/Track.jsx";

import { authService } from "../../../services/api.js";
import { FiUpload } from "react-icons/fi";



function SideBar() {
    console.log("sidebar connected...")

    // CHECKING AUTHENTICATION
    const [authStatus, setAuthStatus] = useState(null);

    // IMAGE UPLOAD STATE
    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '');
    const [selectedFile, setSelectedFile] = useState(null);
    
    const verifyUser = () => {
        const checkAuthentication = async () => {
            const result = await authService.checkAuth();
            setAuthStatus(result);

            if (result.success) {
                console.log("User is authenticated:", result.data);
            } else {
                console.log("User is not authenticated:", result.error);
    
                window.location.href = '/login'; 
            }
        };

        checkAuthentication();
    }
    //THE USE-EFFECTt ON USER VERIFICATION
    useEffect(verifyUser, []);

    //////////////////////////////////////////////////////////////////

    // IMAGE UPLOAD HANDLERS
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select an image first.');
            return;
        }

        const result = await authService.uploadImage(selectedFile);
        if (result.success) {
            const imageUrl = result.data.imageUrl;
            setProfileImage(imageUrl);
            localStorage.setItem('profileImage', imageUrl);
            setSelectedFile(null);
            alert('Image uploaded successfully!');
        } else {
            alert('Upload failed: ' + result.error);
        }
    };

    //LOGOUT FUNCTION HANDLER
    const logOutHandler = async() => {
        const result = await authService.logout();
        if (result.success) {
            // REDIRECT TO LOGIN PAGE AFTER SUCCESSFUL LOGOUT
            window.location.href = "/";
        } else {
            console.error("Logout failed:", result.error);
        }
    };


    const sideContainerRef = useRef(null);
    const subContainerRef = useRef(null);
    const menuIconRef = useRef(null);
    const cancelMenuRef = useRef(null);

    const openMenu = () => {
        sideContainerRef.current.style.width = "290px";
        sideContainerRef.current.style.position = "fixed";
        subContainerRef.current.style.display = "flex";
        menuIconRef.current.style.display = "none";
        cancelMenuRef.current.style.display = "flex";
    }
    const cancelMenu = () => {
        sideContainerRef.current.style.width = "65px";
        sideContainerRef.current.style.position = "relative";
        subContainerRef.current.style.display = "none";
        menuIconRef.current.style.display = "flex";
        cancelMenuRef.current.style.display = "none";
    }

    return(
       
        <div className="sideBarContainer" ref={sideContainerRef}>
            <span className="sideMenuIcon" ref={menuIconRef} onClick={openMenu}> <IoMenu/> </span>
            <span className="cancelMenu" ref={cancelMenuRef} onClick={cancelMenu}> <MdCancel/> </span>

                <span className="subContainer" ref={subContainerRef}>
                    <span className="logoName">CP_Truck</span>
                    <div className="imagePreview">
                        <img src={profileImage} alt="profile Image" />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                        id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="uploadIcon">
                        <FiUpload />
                    </label>
                    {selectedFile && (
                        <button onClick={handleUpload} className="uploadButton">
                            Upload
                        </button>
                    )}

                    {authStatus && (
                        <p className="greetings">
                            {authStatus.success? (`Hi, ${authStatus.data.user?.username.toUpperCase()}!`) : ("Hi, User!")}
                        </p>
                    )}
                    

                    <span className="dashboard">
                        <Link to="/dashboard"><MdDashboard/>Dashboard</Link>
                    </span>
                    
                    <details>
                        <summary>Contact Us</summary>
                        <ul className="menu">
                            <li><Link to=""><FaFacebook/></Link></li>
                            <li><Link to=""><FaXTwitter/></Link></li>
                            <li><Link to=""><MdEmail/></Link></li>
                            <li><Link to=""><FaWhatsapp/></Link></li>
                        </ul>
                    </details>
                    <span className="logout" onClick={logOutHandler}> <CiLogout/> Logout</span>
                </span>
        </div>
        
    );
}

export default SideBar;