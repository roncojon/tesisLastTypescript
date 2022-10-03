import { useEffect, useState } from "react"
import { DeleteProtected } from "../httpRequests"

export const useDeleteProtected = (id,endP,accessToken)=>{
const [deleteResponse,setDeleteResponse] = useState(null)
const [loading,setLoading]= useState(true)

console.log(accessToken)

async function httpResp(){
    const temp = await DeleteProtected(id,endP,accessToken)
    await setDeleteResponse(temp)
    /* await setLoading(false) */
  }

useEffect(() => {
    httpResp()
  /* return () => {
    second
  } */
},[id,endP,accessToken])
return deleteResponse


}