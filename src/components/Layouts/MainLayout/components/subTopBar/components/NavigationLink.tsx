/* eslint-disable react/require-default-props */
import Button from '@mui/material/Button';
import { Typography } from '@mui/material/';
import React /* , { useEffect } */ from 'react';
/* import { Link } from 'react-router-dom'; */
/* import '../containers/SubTopBarStyles.css'; */
import './NavigationLink.css'
import { Link, NavLink } from 'react-router-dom';

type BorderStyleType = {
  borderStyle: string;
  linkName: string;
  onTabClick: (arg: number) => void;
  index: number;
  linkUrl: string;
  isDisabled:boolean
};

const NavigationLink = ({ borderStyle, linkName, onTabClick, index, linkUrl,isDisabled}: BorderStyleType) => 
  /* const borderS = isDisabled ? 'none' : borderStyle;
  const backgroundCS = isDisabled ? 'none' : '#e4e5e6';
  const colorS =isDisabled ? 'none' : '#9da0a3'; */

  /* const [valueB, setValueB] = React.useState('2px solid transparent'); */

  /*  useEffect(() => {
    setValueB(borderStyle);
  }, [borderStyle]); */

  /*   const borderHandlerIn = () => {};
  setValueB('2px solid #43484C');  */ /*  onSelectionLinkChange(props.key)  */


  (
    <NavLink to={linkUrl}>
  <Button
  disabled={isDisabled}
  className="subMenuLinkStyles"
    /* component={Link}
    to={linkUrl} */
    onClick={() => {
      onTabClick(index);
    }}
    sx={{
      minWidth:0,
      margin: '0 16px 0 0',
      padding: '0 0px 0px 0',
      top:-1,
     /*  paddingLeft: '20px', */
     /*  paddingRight: '-116px', */
      textTransform: 'none',
      backgroundColor:!isDisabled ? 'transparent' : '#e4e5e6',
    }}
    /* disabled={disabled} */
  >
    <Typography
      variant="h3"
      className="menuLinks"
      style={{
         borderBottom:!isDisabled ? borderStyle : 'none',
          fontWeight: 400,
          color: !isDisabled ? '#43484C' : '#9da0a3',
           
          borderRadius:'3px 3px 0 0',
          padding:'4px 0px 0px 0px' }}
    >
      {linkName}
    </Typography>
  </Button>
  </NavLink>
)
export default NavigationLink;
