import { useEffect, useState } from "react"
import { Post } from "../httpRequests"

// export const usePost = (key1,value1,key2,value2,endP,data)=>{
  export const usePost = (endP,data)=>{

const [response,setResponse] = useState(null)
const [loading,setLoading]= useState(true)

async function httpResp(){
    // const temp = await PostGeneric(key1,value1,key2,value2,endP,data)
    const temp = await Post(endP,data)
    if(temp!==null)
    await setResponse(temp)
    await setLoading(false)
  }

useEffect(() => {
  if(data){
  setLoading(true)
  setTimeout(() => httpResp(), 4000)
    // httpResp()
  }
},[data])

return {response,loading}
}