import React,{useState} from "react";


let autoLogOutTimer;
const AuthContext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

const calculateRemainingTime=(expirationTime)=>{
    // get current time;
  const currentTime=new Date().getTime();
  // calculate when the idToken will get expired
  const adjExpirationTime=new Date(expirationTime).getTime();

  //this will be a positive value
  const remainingDuration=adjExpirationTime-currentTime;
  return remainingDuration;
}

export const AuthConextProvider=(props)=>{
const storedToken=localStorage.getItem("token");
const[token,setToken]=useState(storedToken);
const isUserLoggedIn=!!token;

const logoutHandler=()=>{
    setToken(null)
    localStorage.clear();
    if(autoLogOutTimer){
    clearTimeout(autoLogOutTimer);}
}

const loginHandler=(token,expirationTime)=>{
    setToken(token)
    localStorage.setItem("token",token);
    const remainingTime=calculateRemainingTime(expirationTime);
    autoLogOutTimer= setTimeout(logoutHandler,remainingTime)
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