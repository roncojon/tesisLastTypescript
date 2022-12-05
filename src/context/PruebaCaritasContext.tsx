import { createContext, useState } from "react";

const PruebaCaritasContext = createContext({});

export function PruebaCaritasProvider({children}){
const [indexOfLastImageClicked,setIndexOfLastImageClicked] = useState(0);

const indexHandler = (index:number)=>{
    if(index>indexOfLastImageClicked)
    setIndexOfLastImageClicked(index)
};
    return (
        <PruebaCaritasContext.Provider value={{indexOfLastImageClicked,indexHandler}}>{children}</PruebaCaritasContext.Provider>
    )
}
export default PruebaCaritasContext;