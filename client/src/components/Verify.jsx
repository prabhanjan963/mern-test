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
      {
        validUrl ? (
          <div>
            <br />
            "Verification successful ✅"
            <Link to='/'>Login</Link>
          </div>
        ) : (
          "Verification fail"
        )}
    </>
  )
}