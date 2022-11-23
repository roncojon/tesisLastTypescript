import { useEffect, useId, useState } from "react"
import { LoginPost } from "../httpRequests"

export const useLogin = (endP,credentials)=>{
const [loginResponse,setLoginResponse] = useState(null)
const [loading,setLoading]= useState(true)

async function httpResp(){
    const temp = await LoginPost(endP,credentials).catch(error=>error.message + Math.random())
    if (temp) {
      await setLoginResponse(temp)
    }
   
    // await setLoading(false)
  }

useEffect(() => {
<<<<<<< HEAD
=======
   setLoading(true)
>>>>>>> origin/develop
  if (credentials.userName && credentials.userName.length>2 && credentials.password && credentials.password.length>2)
    httpResp()
    /* else{
       setLoginResponse(Math.random())
    } */
     setLoading(false)
},[endP,credentials])
return {loginResponse,loading}
}