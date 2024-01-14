import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast';

const defaultData = {
  name: '',
  email: '',
  password: ''
}
export default function Signup() {
  const [user, setUser] = useState(defaultData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user.name ||!user.email ||!user.password){
      return toast.error('Please fill all detail!')
    }

    try {
      const {data} = await axios.post('/api/v1/auth/signup', user)
      if (data.error) {
        toast.error(data.error)
      } else {
        navigate('/')
        toast.success("An Verification Email has been send to email please Verify")
      }
 } catch (error) {
  console.log(error)
 }
  }

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center text-center'>
        <form className='w-96 h-96 flex flex-col items-center p-8 bg-sky-900 rounded-md'>
          <p className='text-3xl mb-4 font-semibold'>Sign Up</p>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Name' name='name' onChange={handleChange}/>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Email' name='email' onChange={handleChange}/>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Password' name='password' onChange={handleChange}/>
          <button
          className='w-full border-2 rounded-full mt-6 p-1 text-blue-600 bg-white'
          onClick={handleSubmit}>Sign Up</button>
          <p className='mt-3 text-white -ml-20'>Already have an account <Link to='/'><span className='text-blue-400'>Login</span></Link></p>
        </form>
      </div>
    </>
  )
}
