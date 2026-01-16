import "./Login.css";
import { authService } from "../../services/api.js";
import { useState, useRef } from "react";
import Loading from "../LoadingPage/Loading.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    console.log("Login Page Connected...");

    const alertMsgRef = useRef();
    const navigate = useNavigate();

    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ loadingpage, setLoadingpage ] = useState(false);

    const loginUser = async(e) => {
        e.preventDefault();
        //TO CLEAR PREVIOUS MESSAGE
        setMessage("");

        //BASIC VALIDATION
        if (!userName || !password) {
            setMessage("Enter Credentials");
            alertMsgRef.current.style.color = "red";
            return;
        }
        
        setLoading(true)

        const result = await authService.login({
            userName,
            password
        })

        setLoading(false);

        if (result.success) {
            setMessage("Login Successfully")
         //CLEAR LOGIN FORM
            setUserName("");
            setPassword("");
            
         //REDIRECT TO DASHBOARD AFTER SUCCESSFUL LOGIN
            navigate("/dashboard");

        } else {
            setMessage(result.error)
        }

        //APPLYING LOADING PAGE////////
            setLoadingpage(true);

            const loadProcess = () => {
                setLoadingpage(false)
            }
            setTimeout(loadProcess, 10000);       
      
    }

        setTimeout(() => {
            setMessage("")
        }, 10000);

        //CONDITIONS TO APPLY LOADING PAGE
            if (loadingpage) {
                return (
                    <Loading/>
                )
            }


    return(
        <div className="loginView">
            <div className="loginContainer">
                <p>CP_Truck</p>

                <form action="" className="formContainer">
                    <label htmlFor="userName">Username</label>
                    <input type="text" name="userName" value={userName} 
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        className="userName" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className="password"/>
                    
                    
                    {/*DISPLAY MESSAGE IF ANY*/}
                    {message && (
                        <div className="alertMsg" ref={alertMsgRef}>
                            {message}
                        </div>
                    )}

                    <span className="loginBtn" 
                        onClick={loginUser}>

                        {loading? "LoggingIn..." : "Login"}
                    </span>
                </form>

                <p className="noAccount">Do not have an account? <Link to="/register">Register</Link></p>

            </div>
        </div>

    );
}

export default Login;