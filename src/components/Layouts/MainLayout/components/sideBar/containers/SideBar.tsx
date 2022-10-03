import sideBarStyles, { logo, logoStyles } from './SideBarStyles';

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

const SideBar = () => (
  <div style={sideBarStyles}>
    <div style={logoStyles}>{logo}</div>
    {/*  <div style={sideBarStyles2}></div> */}
    {/*     <CustomizedButton variant='contained'  > aaa </CustomizedButton> */}
  </div>
);

export default SideBar;
