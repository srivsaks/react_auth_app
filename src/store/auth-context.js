import React,{useState} from "react";

const AuthContext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthConextProvider=(props)=>{
const[token,setToken]=useState(null);
const isUserLoggedIn=!!token;

const loginHandler=(token)=>{
    setToken(token)
}

const logoutHandler=()=>{
    setToken(null)
}

const contextValue={
    token:token,
    isLoggedIn:isUserLoggedIn,
    login:loginHandler,
    logout:logoutHandler
}

return(
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
)
}

export default AuthContext;