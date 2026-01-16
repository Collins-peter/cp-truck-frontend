import "./Order.css";

import { useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md"
import emailjs from "emailjs-com";

function Order() {
    //GETTING DATA FOR THE MAIL
        const [ formData, setFormData ] = useState({
            name: "",
            email: "",
            whatsappNo: "",
            selectFrom: "",
            from: "",
            selectTo: "",
            to: ""
        })
        const handleData = (e) => {
            setFormData({
                ...formData,
                [e.target.name] : e.target.value
            });
        }

        const handleSelectFrom = (e) => {
            const value = e.target.value;
            setFormData(prev => ({
                ...prev,//Helps to Merge with prev. Data without erasing prev. Data
                selectFrom: value,
                from: value
            }))
        }

        const handleSelectTo = (e) => {
            const value = e.target.value;
            setFormData(prev => ({
                ...prev,//Helps to Merge with prev. Data without erasing prev. Data
                selectTo: value,
                to: value
            }))
        }
    //END GETTING

    const areas = ["AGEGE", "ALIMOSHO", "APAPA", "BADAGRY", "EPE", "ETI-OSA", "IBEJU-LEKKI",
        "LAGOS-ISLAND", "OJO", "MUSHIN", "SHOMOLU", "SURULERE", "LAGOS MAINLAND", "IKORODU", "IKEJA"
    ]

    const [ message, setMessage ] = useState("");
    const msgRef = useRef();
    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const whatsappRef = useRef(null);
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const popRef = useRef(null);
    

    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nameRef.current?.value ||
            !emailRef.current?.value ||
            !whatsappRef.current?.value ||
            !fromRef.current?.value || 
            !toRef.current?.value) {

            setMessage("Please Fill the Form")     
        } else {
            //EMAILJS RECEIVING ORDER FROM CUSTOMERS
                emailjs.send(
                    "service_6hhwpad",
                    "template_tyl41cn",
                    formData, 
                    "N1jaXUvhNV7dnqgWt"
                )
                .then((result) => {
                    console.log(result);
                    setShowPopup(true);
                    setMessage("Submitted Successfully");
                    msgRef.current.style.color = "green";
                }, (error) => {
                    console.log(error);
                    setMessage("Error in Submission");
                    msgRef.current.style.color = "red";
                }
                )
            //END EMAILJS   
        }
        
        setTimeout(() => {
            setMessage("");
        }, 5000);
    };

    const cancel = () => {
        popRef.current.style.display = "none"
    }

    //DIRECT USER TO WHATSAPP CHAT
    const whatsappDirect = () => {
        const phoneNumber = "2348171156467";
        const url = `https://wa.me/${phoneNumber}`;

        window.open(url, "_blank")
    }
    
        
    return(
        <div className="orderView">
            <div className="orderContainer">
                <form action="" className="areaLocation" >
                        <p>Area Location</p>

                        <label htmlFor="name">Enter Name</label>
                        <input type="text" name="name" 
                            ref={nameRef}
                            value={formData.name}
                            onChange={handleData}
                        />

                        <label htmlFor="email">Enter Email</label>
                        <input type="email" name="email"
                            ref={emailRef}
                            value={formData.email}
                            onChange={handleData}
                        />

                        <label htmlFor="whatsappNo">Enter WhatsApp Number</label>
                        <input type="number" name="whatsappNo"
                            ref={whatsappRef}
                            value={formData.whatsappNo}
                            onChange={handleData}
                        />

                        {/*FROM A PARTICULAR LOCATION*/}
                        <label htmlFor="from">FROM:</label>
                        <select className="from" value={formData.selectFrom} onChange={handleSelectFrom}>
                            <option value="">---Select---</option> 
                            {areas.map((area) => (
                                    <option value={area} key={area}> {area} </option>
                            ))}
                    
                        </select>
                        <input ref={fromRef} name="from" type="text" className="from"
                            placeholder="Area of Choice" 
                            value={formData.from} readOnly
                            onChange={handleData}
                        />

                        {/*TO A PARTICULAR LOCATION*/}
                        <label htmlFor="to">TO:</label>
                        <select className="to" value={formData.selectTo} onChange={handleSelectTo}>
                            <option value="">---Select---</option>

                            {areas.map((area) => (
                                <option value={area} key={area}> {area} </option>
                            ))}
                            
                        </select>
                        <input ref={toRef} name="to" type="text"
                            className="to" 
                            placeholder="Area of Choice" 
                            value={formData.to} readOnly
                            onChange={handleData}
                        />

                        {message && (
                            <div className="msg" ref={msgRef}>
                                {message}
                            </div>
                        )}

                        <span className="submitBtn" onClick={handleSubmit}>
                            SUBMIT
                        </span>
                    </form>
            </div>

                {/*POP UP MESSAGE */}
                {showPopup && (
                    <div className="popView">
                        <div className="container" ref={popRef}>
                            <p className="success">Submitted Successfully!</p>
                            <p className="from">FROM: {fromRef.current?.value}</p>
                            <p className="to">TO: {toRef.current?.value}</p>
                            <p className="instruct">Click below to view Item on Whatsapp</p>
                            <div className="option">
                                <span onClick={whatsappDirect}> <FaWhatsapp/> </span>
                                <span onClick={cancel}><MdOutlineCancel/></span>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}


export default Order;