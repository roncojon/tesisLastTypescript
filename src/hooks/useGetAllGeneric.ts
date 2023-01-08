import { useEffect, useState } from "react"
import { Get, GetProtected } from "../httpRequests";
import { useAppState } from "stores";

export const useGetAllGeneric = (endP, boolGetAllAgain) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { accessToken } = useAppState((state) => state.authenticationInfo);
  // console.log('aaaaaaaaaabbbb '+accessToken)

  async function httpResp() {
    const temp = await Get(endP/*, accessToken */)
    //if (temp !== null)
    setData(temp)
    setLoading(false)
  }

  useEffect(() => {
    if (boolGetAllAgain) {
      setData("")

      setLoading(true)

      // console.log('BOOOOOOLEAANNNNNNNNN')
      httpResp()
    }
  }, [/* endP, */ boolGetAllAgain])
  return { data, loading }

}