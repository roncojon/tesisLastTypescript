import { useEffect, useState } from "react"
import { Post } from "../httpRequests"

export const usePost = (endP,data)=>{
const [response,setResponse] = useState(null)
const [loading,setLoading]= useState(true)
console.log('aaaaaaaaaaaaaaaaaaaaaaa')

async function httpResp(){
    console.log('cccccccccccccc')
    const temp = await Post(endP,data)
    console.log(temp)
    await setResponse(temp)
    /* await setLoading(false) */
  }

useEffect(() => {
console.log('bbbbbbbbbbbbbbbb')
    
    httpResp()
  /* return () => {
    second
  } */
})
return response


}