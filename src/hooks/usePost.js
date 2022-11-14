import { useEffect, useState } from "react"
import { PostGeneric } from "../httpRequests"

export const usePost = (key1,value1,key2,value2,endP,data)=>{
const [response,setResponse] = useState(null)
const [loading,setLoading]= useState(true)


async function httpResp(){

    const temp = await PostGeneric(key1,value1,key2,value2,endP,data)

    if(temp!==null)
    await setResponse(temp)
    await setLoading(false)
  }

useEffect(() => {
  setLoading(true)
    
    httpResp()
})
return {response,loading}


}