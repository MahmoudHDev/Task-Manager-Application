
import { Navigate } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';



const PrivateRoute = ({ Component }) => {
    const homeURI = 'http://localhost:9000/home';
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Your authentication logic goes here...

    const checkAuth = async ()=> { 
        const response = await axios.get(homeURI)
        return response
    }
    
    console.log(checkAuth)





    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;