import React from 'react';
import { useState } from 'react';
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home';
import Features from './Pages/Features';
import Pricing from './Pages/Pricing';
import Subscription from './Pages/Subscription';
import CreateAccount from './Pages/CreateAccount';
import Signin from './Pages/Signin';
import "react-toastify/dist/ReactToastify.css";
import Footer from './Pages/Footer';
import Database from "./Pages/Database";
import Users from './Components/Users';
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/Firebase-config";

const App = () => {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('is-Auth'));

  //signOut functionality...
  const GoogleSignOut =()=>{
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/signin';
    })
  };


  return (
      
<>
<Navbar GoogleSignOut={GoogleSignOut} isAuth={isAuth}/>
      <Routes>
      <Route path='/' element={<Home setIsAuth={setIsAuth}/>} />
      <Route path='/features' element={<Features setIsAuth={setIsAuth}/>}/>
      <Route path='/pricing' element={<Pricing setIsAuth={isAuth}/>}/>
     <Route path='/subscription' element={<Subscription setIsAuth={setIsAuth}/>}/> 
     <Route path='/createaccount' element={<CreateAccount isAuth={isAuth} />}/>
     <Route path='/signin' element={<Signin/>}/>
     <Route path="/database" element={<Database />} />
     <Route path="/users" element={<Users />} />

      </Routes>
      <Footer/>


   </>
  )
}

export default App
