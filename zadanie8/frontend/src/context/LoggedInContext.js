import { createContext, useEffect, useState } from "react";

export const LoggedInContext = createContext({
    isLoggedIn: false,
    oauthService : "",
    email : "",
    userId : "",
});

export const LoggedInContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [oauthService, setOauthService] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        setIsLoggedIn(sessionStorage.getItem("token"));
    }, [isLoggedIn])

    return (
        <LoggedInContext.Provider value={{
            isLoggedIn, 
            oauthService, 
            setOauthService, 
            email, 
            setEmail, 
            userId, 
            setUserId
        }}>
            {children}
        </LoggedInContext.Provider>
    )
}