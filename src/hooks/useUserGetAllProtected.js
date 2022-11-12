import { useEffect, useState } from "react"
import { GetProtected } from "../httpRequests";
import { useAppState } from "stores";

export const useGetAllProtected = (endP,boolGetAllAgain)=>{
const [usuarios,setUsuarios] = useState(null)
const [loading,setLoading]= useState(true)
const { accessToken } = useAppState((state) => state.isAuthenticated);
// console.log('aaaaaaaaaabbbb '+accessToken)

async function httpResp(){
    const temp = await GetProtected(endP,accessToken)
    if(temp!==null)
    await setUsuarios(temp)
    await setLoading(false)
  }

useEffect(() => {
  setLoading(true)
    httpResp()
  /* return () => {
    second
  } */
},[endP,boolGetAllAgain])
return {usuarios,loading}

}