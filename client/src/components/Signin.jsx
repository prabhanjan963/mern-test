import { Link,useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast';

const defaultData = {
    email:'',
    password:''
  }
export default function Signin() {
  const [user,setUser] = useState(defaultData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    
    try {
      const {data} = await axios.post('/api/v1/auth/signin', user)
      if (data.error) {
        toast.error("Wrong Credential!")
      } else {
        navigate('/home')
      }
 } catch (error) {
  toast.error("Please Verify Your Email")
}
  }

  return (
    <>
<div className='w-full h-screen flex justify-center items-center text-center'>
        <form className='w-96 h-80 flex flex-col items-center bg-sky-900 rounded-md p-12'>
          <p className='text-3xl mb-4 font-semibold'>Login</p>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Email' name='email' onChange={handleChange}/>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Password' name='password' onChange={handleChange}/>
          <button
          className='w-full border-2 rounded-full mt-6 p-1 text-blue-600 bg-white'
          onClick={handleSubmit}>Login</button>
          <p className='mt-3 text-white -ml-20'>Dont have an account <Link to='/signup'><span className='text-blue-400'>Sign Up</span></Link></p>
        </form>
      </div>
    </>
  )
}
