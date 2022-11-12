import { useEffect, useState } from "react"
import { Get, GetByName, GetProtected } from "../httpRequests";
import { useAppState } from "stores";

export const useSearchUsersByName = (key,name,endP,boolGetByNameAgain)=>{
const [usuariosByName,setUsuarios] = useState(null)
const [loadingUsuariosByName,setLoading]= useState(true)
// const [getByNameAgain,setGetByNameAgain] = useState(true);
const { accessToken } = useAppState((state) => state.isAuthenticated);
// console.log('aaaaaaaaaabbbb '+accessToken)

async function httpResp(){
    const temp = await GetByName(key,name,endP/* ,accessToken */)
    // console.log(GetByName(key,name,endP/* ,accessToken */))
    if(temp!==null)
    await setUsuarios(temp)
    // await setLoading(false)
  }

useEffect(() => {

  setLoading(true)
  if(name.length> 3)
  {
    // setGetByNameAgain(boolGetByNameAgain);
    httpResp()
  }
  setLoading(false)
  /* return () => {
    second
  } */
},[key,name,endP,boolGetByNameAgain])
return {usuariosByName,loadingUsuariosByName}

}