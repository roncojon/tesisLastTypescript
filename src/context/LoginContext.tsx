// @ts-nocheck
import { createContext, useState } from "react";

const LoginContext = createContext();

export function LoginProvider({children}){
const [isLogedIn,setIsLogedIn] = useState(false);
const [token,setToken] = useState({});
const [userId,setUserId] = useState(0);
const [accessToken,setAccessToken] = useState('');
const [rol,setRol] = useState('');


    return (
        <LoginContext.Provider value={{userId,setUserId,isLogedIn,setIsLogedIn,token,setToken,accessToken,setAccessToken,rol,setRol}}>{children}</LoginContext.Provider>

    )
}
export default LoginContext;