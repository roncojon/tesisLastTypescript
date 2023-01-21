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
   setLoading(true)
  if (credentials.ci && credentials.ci.length>0 && credentials.password && credentials.password.length>0)
    httpResp()
    /* else{
       setLoginResponse(Math.random())
    } */
     setLoading(false)
},[endP,credentials])
return {loginResponse,loading}
}