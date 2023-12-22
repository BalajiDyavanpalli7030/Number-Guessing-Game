import React , {useState} from "react";
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import SignIn from './SignIn/sign-in';
import SignUp from './SignUp/sign-up';
import Game from './main-game/game';
import Error from './Error';
import ProtectedRoute from './ProtectedRoute';
import Home from "./home";
const AppRouter = () => {
  const [userSignInDetails,setUserSignInDetails] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='signin' element={<SignIn setUserSignInDetails={setUserSignInDetails}/>} />
        <Route path='signup' element={<SignUp />} />

        <Route path="game" element={
                  <ProtectedRoute userSignInDetails={userSignInDetails}>
                    <Game userSignInDetails={userSignInDetails} setUserSignInDetails={setUserSignInDetails}/>
                  </ProtectedRoute>
              }/>

        {/* <Route path="login" element={<Login setUser={setUser}/>} />

       <Route path="dashboard" element={
                  <ProtectedRoute user={user}>
                    <Dashboard user={user}/>
                  </ProtectedRoute>
              }/> */}

        <Route  path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;