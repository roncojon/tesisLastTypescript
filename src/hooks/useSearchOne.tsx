import { useEffect, useState } from "react"
import { Get, GetWithParams, GetProtected } from "../httpRequests";
import { useAppState } from "stores";

export const useSearchOne = (key, name, endP, boolGetByNameAgain) => {
  const [usuariosByName, setUsuarios] = useState(null)
  const [loadingUsuariosByName, setLoading] = useState(true)
  // const [getByNameAgain,setGetByNameAgain] = useState(true);
  const { accessToken } = useAppState((state) => state.authenticationInfo);
  // console.log('aaaaaaaaaabbbb '+accessToken)

  async function httpResp() {
    // setLoading(true)

    const temp = await GetWithParams(key, name, endP/* ,accessToken */)
    // console.log(GetByName(key,name,endP/* ,accessToken */))
    // if(temp!==null)
    setUsuarios(temp)
    setLoading(false)
  }

  useEffect(() => {

    /* if (name.length > 3) { */
      setLoading(true)
      setUsuarios(null)
      // setGetByNameAgain(boolGetByNameAgain);
      httpResp()
    /* } */
    /* return () => {
      second
    } */

  }, [/* key, */ name, /* endP, */ boolGetByNameAgain])
  return { usuariosByName, loadingUsuariosByName }

}