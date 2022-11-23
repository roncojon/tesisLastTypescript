import { useEffect, useId, useState } from "react"
import { LoginPost } from "../httpRequests"

export const useLogin = (endP,credentials)=>{
const [loginResponse,setLoginResponse] = useState(null)
const [loading,setLoading]= useState(true)

async function httpResp(){
    const temp = await LoginPost(endP,credentials).catch(error=>error.message + Math.random())

    await setLoginResponse(temp)
    await setLoading(false)
  }

useEffect(() => {
  if (credentials.userName && credentials.userName.length>2 && credentials.password && credentials.password.length>2)
    httpResp()
    /* else{
       setLoginResponse(Math.random())
    } */
},[endP,credentials])
return {loginResponse,loading}

}