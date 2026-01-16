import "../HomePage/Home.css";
import landingPage from "../../assets/landingPageImg.png";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useRef } from "react";

function Home() {
    console.log("Home is connected...");
    console.log(import.meta.env.VITE_API_URL);
    const sideBarRef = useRef(null);

    //USE-REF FOR SIDEBAR
    const openMenu = () => {
        if (sideBarRef.current) {
            sideBarRef.current.style.display = "flex";
        }
        console.log("opened...");
    }
    const closeMenu = () => {
        if (sideBarRef.current) {
            sideBarRef.current.style.display = "none";
        }
        
        console.log("closedMenu...");
    }


    return (
        <div className="homeView">
            <ul ref={sideBarRef} className="sideBar">
                <span className="closeMenu" onClick={closeMenu}><MdCancel/></span>
                <li><Link to="/login">Login</Link></li>
                <details>
                    <summary>Contact Us</summary>
                    <ul className="menu">
                        <li><Link to=""><FaFacebook/></Link></li>
                        <li><Link to=""><FaXTwitter/></Link></li>
                        <li><Link to=""><MdEmail/></Link></li>
                        <li><Link to=""><FaWhatsapp/></Link></li>
                    </ul>
                </details>
            </ul>


            <div className="homeContainer">
                <nav>
                    <p>CP-Truck</p>
                    <ul className="firstBar">
                        <span className="openMenu" onClick={openMenu}><IoMenu/></span>
                        <li><Link to="/login">Login</Link></li>
                        <details>
                            <summary>Contact Us</summary>
                            <ul className="menu">
                                <li><Link to=""><FaFacebook/></Link></li>
                                <li><Link to=""><FaXTwitter/></Link></li>
                                <li><Link to=""><MdEmail/></Link></li>
                                <li><Link to=""><FaWhatsapp/></Link></li>
                            </ul>
                        </details>
                        
                    </ul>

                    
                </nav>

                <div className="homeBody">
                    <span>
                        <p>
                            Streamline<br/> Your Truck <br/> Dispatching
                        </p>
                        <p>Optimize routes and boost efficiency today.</p>
                        <button><Link to="/register">Register</Link></button>
                    </span>
                    <img src={landingPage} alt="landing Image" />

                </div>
            </div>
        </div>
    );
}

export default Home;
