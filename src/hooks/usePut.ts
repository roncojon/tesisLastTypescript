import { useEffect, useState } from "react"
import { Put } from "../httpRequests"

// export const usePost = (key1,value1,key2,value2,endP,data)=>{
  export const usePut = (id,endP,data,again)=>{

const [response,setResponse] = useState(null)
const [loading,setLoading]= useState(true)

async function httpResp(){
    // const temp = await PostGeneric(key1,value1,key2,value2,endP,data)
    const temp = await Put(id,endP,data)
    if(temp!==null)
    await setResponse(temp)
    await setLoading(false)
  }

useEffect(() => {
  if(again){
  setLoading(true)
  // setTimeout(() => httpResp(), 4000)
     httpResp()
  }
},[data,again])

return {response,loading}
}