import { useState } from 'react';
import {AiFillEyeInvisible, AiFillEye, AiOutlineMail} from 'react-icons/ai';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { auth } from '../Firebase/Firebase-config';
import LoadSpinner from '../Utils/LoadSpinner';
import signin from '../assets/signin.png';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};


const CreateAccount = ({setisAuth}) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
    //de-structing the initialState
    const {username, email, password, confirmPassword} = formData;

      //toggling for password eye
      const [passwordEye, setPasswordEye] = useState(false);
      const handlePasswordEye = () => {
        setPasswordEye(!passwordEye)
      }
      
      const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
      const handleConfirmPasswordEye = () => {
        setConfirmPasswordEye(!confirmPasswordEye)
      }

      const validateForm = () => {
        let newErrors = {};
    
        // Validate username
        if (!username) {
          newErrors.username = 'Username is required';
        }
  
        // Validate email
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is invalid';
        }
  
        // Validate password
        if (!password) {
          newErrors.password = 'Password is required';
        } else if (password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters long';
        }
    
        // Validate confirm password
        if (!confirmPassword) {
          newErrors.confirmPassword = 'ConfirmPassword is required';
        } else if (confirmPassword !== password) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
    
        setErrors(newErrors);
    
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
  
        if(validateForm()){
  
          try {
            setLoading(true);
            if (username && email && password ){
             const {user} = await createUserWithEmailAndPassword(
               auth, email, password
             );
             await updateProfile(user, {displayName: `${username}`})
             setLoading(false);
             toast.success('signup successfully');
             localStorage.setItem('LoggedIn_invoice', true);
             setisAuth(true);
             navigate('/invoice')
             setLoading(false);
            }  
           } catch (error) {
             toast.error('user already exit')
             console.error(error)
             setLoading(false);
           }
      }
      };
  
      const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value.trim()});
      };
  
  return (
    <div className='contact-container'>
         <img src={signin} alt="Login" className="contact-image" />
    <div className='login flex items-center justify-center min-h-screen '>
       {loading && <LoadSpinner />}
    <div className='shadow-lg rounded-lg p-8 max-w-[800px] w-full'>
      <div className=' dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black'>
        <h1 className='text-2xl font-bold text-[#FF7143] ' > Sign In </h1> 
        <form onSubmit={handleSubmit}>

          <div className='grid md:grid-cols-2 md:gap-8'>

          <div className='md:my-4'>
              <label>Email Address</label>
              <div className='my-2 w-full relative'>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="email" 
                  placeholder='Enter Email Address'
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <AiOutlineMail className='absolute right-2 top-3 text-gray-400' /> 
              </div>
              {errors.email && ( <span className="text-red-500">{errors.email}</span>)}
            </div> 

          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>

          <div className='md:my-4'>
              <label>Password</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type={(passwordEye === false) ? 'password' : 'text'} 
                  placeholder='Enter your Password'
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <div className='absolute right-2 top-3'>
                  {(passwordEye === false) ? <AiFillEyeInvisible onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye onClick={handlePasswordEye} className='text-gray-400'/>}
                </div>
              {errors.password && ( <span className="text-[red]">{errors.password}</span>)}
              </div>
            </div>
</div>

          <p className='text-center text-sm py-1'>By signing in you accept our <span className='underline'>terms and conditions & privacy policy</span></p>
                 
        <Link to={'https://logoipsum.com'}> <button type='submit' className='w-[50%] my-4 md:my-2 p-3 bg-[#5454D4] text-white rounded-lg font-semibold'> Sign In </button></Link>
        </form> 

        
        <hr className="my-6 border-gray-300 w-full" />
     


        <p className='my-4'>Don't have an account? <Link className='text-[#5454D4] underline' to={'/createaccount'}>sign up</Link></p>
      </div>
    </div>
  </div>

  
  </div>
  )
}

export default CreateAccount;