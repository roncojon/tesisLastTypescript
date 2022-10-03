import { useEffect, useState } from "react"
import { LoginPost } from "../httpRequests"

export const useLogin = (endP,credentials)=>{
const [loginResponse,setLoginResponse] = useState(null)
const [loading,setLoading]= useState(true)

async function httpResp(){
    const temp = await LoginPost(endP,credentials)
    await setLoginResponse(temp)
    await setLoading(false)
  }

useEffect(() => {
  if (credentials.nickName && credentials.nickName.length>2 && credentials.password && credentials.password.length>2)
    httpResp()
},[endP,credentials])
return {loginResponse,loading}

}