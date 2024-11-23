import {FcGoogle} from 'react-icons/fc';
import {  signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../Firebase/Firebase-config';


const GoogleAuth = ({setisAuth}) => {

  const navigate = useNavigate();


  const handleGoogleClick = () =>{
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("LoggedIn_invoice", true);
      setisAuth(true)
      navigate('/invoice')
    })

  }



  return (
    <button  onClick={handleGoogleClick} className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
    <div className="flex items-center justify-center">
    <FcGoogle className='w-7 h-7'/>
        <span className="ml-4"> Log in with Google </span>
    </div>
</button>
  )
}

export default GoogleAuth;