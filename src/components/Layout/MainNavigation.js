import { Link } from 'react-router-dom';
import {useContext} from "react";
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authContext=useContext(AuthContext);
  const isLoggedIn=authContext.isLoggedIn;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn?null:<li>
            <Link to='/auth'>Login</Link>
          </li>}
           {isLoggedIn&&<li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn&&<li>
            <button>Logout</button>
          </li>}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;