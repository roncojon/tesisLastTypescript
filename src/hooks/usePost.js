import { useEffect, useState } from "react"
import { Post } from "../httpRequests"
import { useAppState } from "stores";

// export const usePost = (key1,value1,key2,value2,endP,data)=>{
  export const usePost = (endP,data,again)=>{

const [response,setResponse] = useState(null)
const [loading,setLoading]= useState(true)
const { accessToken } = useAppState((state) => state.authenticationInfo);

async function httpResp(){
    const temp = await Post(endP,data,accessToken)
     setResponse(temp)
     setLoading(false)
  }

useEffect(() => {
  
  if(again){
    setResponse("")
  setLoading(true)
  // setTimeout(() => httpResp(), 4000)
     httpResp()
  }
},[data,again])

return {response,loading}
}