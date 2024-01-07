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

  const submitData = async (e) => {
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
      <input type="text" name="name" placeholder="name" onChange={handleChange} />
      <input type="text" name="email" placeholder="email" onChange={handleChange} />
      <input type="text" name="password" placeholder="password" onChange={handleChange} />
      <button onClick={submitData}>Register</button>
      <Link to="signin">login</Link>
    </>
  )
}
