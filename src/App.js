import { Switch, Route, Redirect } from 'react-router-dom';
import {useContext} from "react";
import AuthContext from './store/auth-context';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const authContext=useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authContext.isLoggedIn&&<Route path='/auth'>
          <AuthPage />
        </Route>}
        {authContext.isLoggedIn&&<Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path="*"> 
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
