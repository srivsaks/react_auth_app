import classes from './ProfileForm.module.css';
import {useRef,useContext} from "react";
import AuthContext from '../../store/auth-context';
const ProfileForm = () => {
  const newPasswordRef=useRef();
  const authContext=useContext(AuthContext);

  const onSubmit=(e)=>{
   e.preventDefault();
   const newPsswd=newPasswordRef.current.value;
   fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSDpEmWNTRJvxUIn6LHctQQ6B5wCZBi1I",{
     method:"POST",
     body:JSON.stringify({
     idToken:authContext.token,
     password:newPsswd,
     returnSecureToken:false,
     }),
     headers:{
       "Content-Type":"application/json"
     }
   }).then((res)=>{
       if(res.ok)
       {
            return res.json();
       }
       else{
         return res.json().then((data)=>{
           alert("Failed to update psswd!")
         })
       }
  })
  .then((data)=>{
    // authContext.login(data.idToken);
    alert("Successfully updated Psswd")
    // console.log(data);
  }).catch((e)=>{

   })
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
