import { createContext, useState, useContext, useEffect} from "react";
import { registerRequest, loginRequest, verityTokenRequet } from "../api/auth";
import Cookies from 'js-cookie'
export const AuthContext = createContext ();

 export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error ("useAuth must be used within an AuthProvider");
    }
    return context;
}


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const signup = async(user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data.message);
        }
    };

    const signin = async (user ) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() =>{
        if(errors.length > 0){
            const timer = setTimeout(()=> {
                setErrors([])
            }, 5000);
            return () => clearTimeout (timer);
        }
        
    } , [errors]);

    // Para ver si hay una cookie con el token 
    useEffect(() =>{

        const checkLogin = async () => {
            const cookies = Cookies.get();

            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            try {
                const res = await verityTokenRequet(cookies.token);
                if(!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    } , []);

    return (
        <AuthContext.Provider value={{signup, user, isAuthenticated, errors, signin, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}