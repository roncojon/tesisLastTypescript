import { useEffect, useState } from "react"
import { Get } from "../httpRequests"

export const useGetAll = (endP)=>{
const [usuarios,setUsuarios] = useState(null)
const [loading,setLoading]= useState(true)

async function httpResp(){
    const temp = await Get(endP)
    await setUsuarios(temp)
    /* await setLoading(false) */
  }

useEffect(() => {
    httpResp()
  /* return () => {
    second
  } */
},[endP])
return usuarios


}