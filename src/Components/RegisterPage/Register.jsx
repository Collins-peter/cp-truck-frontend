import { useState, useRef } from "react";
import "./Register.css";
import { authService } from "../../services/api.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Register() {
    console.log("Register Page Connected...");
    const navigate = useNavigate();

    const alertMsgRef = useRef();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
   

    const createUser = async () => {
        // TO CLEAR PREVIOUS MESSAGE
        setMessage("");

        // BASIC VALIDATION
        if (!userName || !email || !password || !confirmPassword) {
            setMessage("Please fill in all fields");
            alertMsgRef.current.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            alertMsgRef.current.style.color = "red";
            return;
        }

        setLoading(true);

        const result = await authService.register({
            userName,
            email,
            password,
            confirmPassword
        });

        setLoading(false);

        if (result.success) {
            alertMsgRef.current.style.color = "green";
            setMessage("Registration successful!");
            // CLEAR FORM ON SUCCESS
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // REDIRECT TO LOGIN PAGE AFTER SUCCESSFUL REGISTRATION
            navigate("/login");
            
        } else {
            alertMsgRef.current.style.color = "red";
            setMessage(result.error); 
        }
    }
        //SET-TIME-OUT
            setTimeout(() => {
                    setMessage("")
                }, 7000);
    

    return(
        <div className="registerView">
            <div className="registerContainer">
                <p>CP_Truck</p>

                
                <form action="" className="formContainer">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        name="userName"
                        className="userName"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                        
                    />

                    {/* Display message if any */}
                    {message && (
                        <div className="alertMsg" ref={alertMsgRef}>
                            {message}
                        </div>
                    )}

                    <span className="submitBtn" onClick={createUser}>
                        {loading ? 'Registering...' : 'Submit'}
                    </span>
                </form>

                <p className="alreadyHas">Already have an account?
                    <Link to="/login">Login</Link>
                </p>

            </div>
        </div>

    );

}

export default Register;