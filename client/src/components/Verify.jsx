import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function Verify() {
  const [validUrl, setValidUrl] = useState(false)
  const { token } = useParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
       const url = `http://localhost:8000/api/v1/auth/verify/${token}`
      const { data } = await axios.get(url)
      console.log(data)
      setValidUrl(true)
      } catch (error) {
        setValidUrl(false)
      }
    }
    verifyEmail()
  },[])

  return (
    <>
    <div className="w-full h-screen bg-black text-white flex justify-center items-center text-center">
      
      {
        validUrl ? (
          <div className="text-2xl flex flex-col">
            <br />
            Verification Successful ✅
            <Link to='/' className="text-blue-500">Login</Link>
          </div>
        ) : (
          <div className="text-2xl">
          Verification Failed
          </div>
        )}
        </div>
    </>
  )
}