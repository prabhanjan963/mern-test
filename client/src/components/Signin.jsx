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

  const submitData = async (e) => {
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
     <input type="text" name="email"  placeholder="email" onChange={handleChange}/> 
     <input type="text" name="password" placeholder="password" onChange={handleChange}/> 
     <button onClick={submitData}>Login</button>
     <Link to="signup">Register</Link>
    </>
  )
}
