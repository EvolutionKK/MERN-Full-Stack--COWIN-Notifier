import './App.css';
import { useEffect, createContext, useReducer, useContext} from 'react'
import {reducer,initialState} from './reducers/userReducer';
import Login from './Components/login.component';
import Signup from './Components/signup.component';
import Privateroute from './Components/Privateroute';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export const UserContext = createContext()
 
function App() { 
  const [state, dispatch] = useReducer(reducer, initialState)
  return ( 
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Switch>
        <Privateroute exact path="/" component={'/'}/> 
        <Route path="/login" component={Login}/> 
        <Route path="/signup" component={Signup}/> 
      </Switch>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;