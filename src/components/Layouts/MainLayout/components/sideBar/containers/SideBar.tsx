import { useEffect, useState } from 'react';
import sideBarStyles, { logo, logoStyles, /* sideBarContainer, */ sideBarSuperContainer, sideBarTop } from './SideBarStyles';
import logoUne from '../../../../../../imgs/une.svg'
/* const CustomizedButton = styled(Button)`
  color: #20b2aa;

  $.MuiAutocomplete-endAdornment {display:none}

  &.MuiButton-root {
   color : black;
  }
  :hover {
    color: yellow;
  }
`; */
let counter = 0
 const SideBar = () => { 
  /* const [width,setWidth] = useState(0)
  
useEffect(() => {
  const actualWidth = window.visualViewport.width
  if(actualWidth !==width)
  window.visualViewport.addEventListener("resize",()=>setWidth(actualWidth))


  return () => {
    window.visualViewport.removeEventListener("resize",()=>setWidth(window.visualViewport.width))
  }
})

  */
  
  return(
  <>
{/*   {}

  {window.visualViewport.width > 1200 ? */}
  <div style={sideBarSuperContainer}>
    <div style={sideBarTop}></div>
  {/* <div style={sideBarContainer}> */}
  <div style={sideBarStyles}>
    <div style={logoStyles}><img style={{width:'40px', height:'40px', borderRadius: '6px'}} src={logoUne} alt="logo une"/></div>
    {/*  <div style={sideBarStyles2}></div> */}
    {/*     <CustomizedButton variant='contained'  > aaa </CustomizedButton> */}
  </div>
 {/*  : ''} */}
 {/* </div> */}
 </div>
  </>
)};

export default SideBar;
