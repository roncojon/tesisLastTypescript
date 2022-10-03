import { useEffect, useState } from "react"
import { Delete } from "../httpRequests"

export const useDelete = (id,endP)=>{
const [deleteResponse,setDeleteResponse] = useState(null)
const [loading,setLoading]= useState(true)

async function httpResp(){
    const temp = await Delete(id,endP)
    await setDeleteResponse(temp)
    /* await setLoading(false) */
  }

useEffect(() => {
    httpResp()
  /* return () => {
    second
  } */
},[id,endP])
return deleteResponse


}