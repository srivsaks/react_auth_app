import { useState,useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const[isLoading,setIsLoading]=useState(false);
  const authContext=useContext(AuthContext);
  const history=useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{

  e.preventDefault();
  setIsLoading(true)
  const email=emailInputRef.current.value;
  const password=passwordInputRef.current.value;

  if(isLogin){
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSDpEmWNTRJvxUIn6LHctQQ6B5wCZBi1I',{
      method:"POST",
      body:JSON.stringify({
        email:email,
        password:password,
        returnSecureToken:true,
      }),
      headers:{
        "Content-Type":"application/json"}
    }).then((res)=>{
      setIsLoading(false);
         if(res.ok)
         {
              return res.json();
         }
         else{
           return res.json().then((data)=>{
             const errorMessage=data.error.message;
             alert("Authentication Failed!")
           })
         }
    })
    .then((data)=>{
      authContext.login(data.idToken);
      history.replace("/")
      // console.log(data);
    })
    .catch((e)=>{
      setIsLoading(false);
       console.log(e)
    })
  }
  else{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSDpEmWNTRJvxUIn6LHctQQ6B5wCZBi1I',{
      method:"POST",
      body:JSON.stringify({
        email:email,
        password:password,
        returnSecureToken:true,
      }),
      headers:{
        "Content-Type":"application/json"}
    }).then((res)=>{
      setIsLoading(false);
         if(res.ok)
         {
          return res.json();
         }
         else{
           return res.json().then((data)=>{
             const errorMessage=data.error.message;
             alert("Authentication Failed!")
           })
         }
    })
    .then((data)=>{
      authContext.login(data.idToken);
    })
    .catch((e)=>{
      setIsLoading(false);
       console.log(e)
    })
  }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
         {!isLoading&&<button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading&&<p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
