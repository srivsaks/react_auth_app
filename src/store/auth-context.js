import React,{useState} from "react";

const AuthContext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthConextProvider=(props)=>{
const storedToken=localStorage.getItem("token");
const[token,setToken]=useState(storedToken);
const isUserLoggedIn=!!token;

const loginHandler=(token)=>{
    setToken(token)
    localStorage.setItem("token",token);
}

const logoutHandler=()=>{
    setToken(null)
    localStorage.clear();
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