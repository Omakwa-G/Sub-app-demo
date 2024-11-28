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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './Pages/Footer';


const App = () => {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('is-Auth'));

  return (
    <div>
      <Navbar/>


      <Routes>
      <Route path='/' element={<Home setIsAuth={setIsAuth}/>} />
      <Route path='/features' element={<Features setIsAuth={setIsAuth}/>}/>
      <Route path='/pricing' element={<Pricing setIsAuth={setIsAuth}/>}/>
     <Route path='/subscription' element={<Subscription setIsAuth={setIsAuth}/>}/> 
     <Route path='/createaccount' element={<CreateAccount isAuth={isAuth} />}/>
     <Route path='/signin' element={<Signin/>}/>
      </Routes>
      <Footer/>


    </div>
  )
}

export default App
