import React from 'react';
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


const App = () => {
  return (
    <div>
      <Navbar/>


      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/features' element={<Features/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
     <Route path='/subscription' element={<Subscription/>}/> 
     <Route path='/createaccount' element={<CreateAccount/>}/>
     <Route path='/signin' element={<Signin/>}/>
      </Routes>


    </div>
  )
}

export default App
