import React,{useState,useEffect,useCallback} from "react";


let autoLogOutTimer;
const AuthContext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

const retrieveStoredToken=()=>{
  const storedToken=localStorage.getItem("token");
  const storedExpirationDate=localStorage.getItem("expirationTime");
const remainingTime=calculateRemainingTime(storedExpirationDate);

if(remainingTime<=3600){
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
}

return {
    token:storedToken,
    duration:remainingTime
}
}

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
    const tokenData=retrieveStoredToken();
    let initialToken;
    if(tokenData){
        initialToken=tokenData.token
    }
const[token,setToken]=useState(initialToken);
const isUserLoggedIn=!!token;

useEffect(()=>{
if(tokenData){
    autoLogOutTimer=setTimeout(logoutHandler,tokenData.duration)
}
},[tokenData,logoutHandler]);

const logoutHandler=useCallback(()=>{
    setToken(null)
    localStorage.clear();
    if(autoLogOutTimer){
    clearTimeout(autoLogOutTimer);}
},[])

const loginHandler=(token,expirationTime)=>{
    setToken(token)
    localStorage.setItem("token",token);
    localStorage.setItem("expirationTime",expirationTime);
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