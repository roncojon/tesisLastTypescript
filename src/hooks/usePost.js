import { useEffect, useState } from "react"
import { Post } from "../httpRequests"

export const usePost = (endP,data)=>{
const [response,setResponse] = useState(null)
const [loading,setLoading]= useState(true)


async function httpResp(){

    const temp = await Post(endP,data)

    await setResponse(temp)
    /* await setLoading(false) */
  }

useEffect(() => {

    
    httpResp()
  /* return () => {
    second
  } */
})
return response


}