import { useEffect, useState } from "react"
import { Get, GetProtected } from "../httpRequests";
import { useAppState } from "stores";

export const useGetAllGeneric = (endP,boolGetAllAgain:boolean | null)=>{
const [data,setData] = useState(null)
const [loading,setLoading]= useState(true)
const { accessToken } = useAppState((state) => state.isAuthenticated);
// console.log('aaaaaaaaaabbbb '+accessToken)

async function httpResp(){
    const temp = await Get(endP/*, accessToken */)
    if(temp!==null)
    await setData(temp)
    await setLoading(false)
  }

useEffect(() => {
  setLoading(true)
    httpResp()
  /* return () => {
    second
  } */
},[endP,boolGetAllAgain])
return {data,loading}

}