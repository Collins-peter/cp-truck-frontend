import "./Complaint.css";

import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Loading from "../LoadingPage/Loading";
import { useState } from "react";
import { Link } from "react-router-dom"
import emailjs from "emailjs-com";

import VerifyMiddleware from "../../services/VerifyMiddleware";

function Complaint() {
    console.log("New Request Connected...");
    
    VerifyMiddleware();


    //COMPLAINT EMAIL RECEIVER
    const [ alert, setAlert ] = useState("");
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            "service_6hhwpad",
            "template_3elxtzg",
            formData,
            "N1jaXUvhNV7dnqgWt"
        )
        .then((result) => {
            console.log(result);
            setAlert("Successfully Submitted");
            setFormData({
                name: "",
                email: "",
                message: ""
            })
            setTimeout(() => {
                setAlert("");
            }, 3000);
            }, (error) => {
                console.log(error);
                setAlert("Submission Failed");
                setTimeout(() => {
                    setAlert("")
                }, 3000)
            }

        )
    }

    

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
        <div className="requestView">
            <div className="requestContainer">
                <span className="dashIcon">
                    <Link to="/dashboard" onClick={loadHandler}><MdDashboard/></Link>
                </span>
                <span className="requestIcon"><FaPlus/>Complaint Service</span>
                
                <div className="requestBody">
                    <p className="textWrite">Add Complaint</p>
                    {alert && (
                        <div className="alertMsg">{alert}</div>
                    )}

                    <form action="" className="textBox" onSubmit={handleSubmit}>
                        <label htmlFor="name">Enter Name</label>
                        <input type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Enter Email</label>
                        <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="message">Message</label>
                        <textarea name="message" 
                            className="newText"
                            value={formData.message}
                            onChange={handleChange}>
                        </textarea>
                        <span className="sendBtn" type="submit" onClick={handleSubmit}>Send</span>
                    </form>

                    <div className="areaImage">
                        <div>AGEGE</div>
                        <div>ALIMOSHO</div>
                        <div>APAPA</div>
                        <div>BADAGRY</div>
                        <div>EPE</div>
                        <div>ETI-OSA</div>
                        <div>IBEJU-LEKKI</div>
                        <div>LAGOS ISLAND</div>
                        <div>OJO</div>
                        <div>MUSHIN</div>
                        <div>SHOMOLU</div>
                        <div>SURULERE</div>
                        <div>LAGOS MAINLAND</div>
                        <div>IKORODU</div>
                        <div>IKEJA</div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Complaint;