import { authService } from "./api";
import { useEffect } from "react";


//VERIFYING USER AUTHENTICATION
function VerifyMiddleware()  {
    const verifyUser = () => {
        const checkAuthentication = async () => {
            const result = await authService.checkAuth();
        
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
} 

export default VerifyMiddleware;