import React from 'react';
import './SubTopBarStyles.css';
/* import commands from '../../../../../../' */
import { Container } from '@mui/material';

// import { useAppDispatch, useAppState } from '@app/stores';
// import { setSelectedComponent } from '@app/stores/selectedComponent.store';
import NavigationLink from '../components/NavigationLink';
import { useAppState, useAppDispatch } from 'stores';
import { setSelectedComponent } from 'stores/selectedComponent.store';
/* import NavigationLink from './subComponents/NavigationLink'; */

/* const CustomizedButton = styled(Button)`
  &.MuiButton-root {
   color : green;
  }
  hover {
 backgroundColor: blue
  }
`; */
/* const border = '2px solid #43484C';
const noBorder = '2px solid transparent'; */

const SubTopBar = () => {
  /* const [valueB] = React.useState('2px solid transparent'); */
  const noStyle = '2px solid #43484C';
  const wayToStyle = '2px solid transparent';

  const { value } = useAppState((state) => state.selectedComponent);
  console.log(`selectedComponent: ${value}`)

  const dispatch = useAppDispatch();

  const handleClick = (index) => {
    dispatch(
      setSelectedComponent({
        value: index,
      }),
    )
  };
  const checkActive = (index: number) => (value === index ? noStyle : wayToStyle);

  return (
    <div className="fullWidth">
    <Container className="try">
      <Container className="title">Dashboard ejecutivos</Container>
      <Container className="menu" >
        <NavigationLink
          isDisabled={false}
          key="stbINFO"
          index={1}
          linkUrl="/dashboard"
          onTabClick={async (ind: number) => handleClick(ind)}
          linkName="Información de la empresa"
          /*     className={`tab ${checkActive(1, 'active')}`} */
          borderStyle={checkActive(1)}
        />
        <NavigationLink
          isDisabled={process.env.STAGE==='prod'}
          key="stbCTE"
          index={2}
          linkUrl="/carpetatributaria"
          onTabClick={async (ind: number) => handleClick(ind)}
          linkName="Carpeta tributaria electrónica"
          borderStyle={checkActive(2)}
        /* disabled */
        />
        <NavigationLink
          isDisabled={false}
          key="stbVenta"
          index={3}
          linkUrl="/ventas"
          onTabClick={async (ind: number) => handleClick(ind)}
          linkName="Ventas"
          borderStyle={checkActive(3)}
        /*  disabled */
        />
        <NavigationLink
          isDisabled={false}
          key="stbVentaAcumulada"
          index={4}
          linkUrl="/ventasacumuladas"
          onTabClick={async (ind: number) => handleClick(ind)}
          linkName="Ventas acumuladas"
          borderStyle={checkActive(4)}
        /* disabled */
        />
        <NavigationLink
          isDisabled={process.env.STAGE==='prod'}
          key="stbBAL"
          index={5}
          linkUrl="/balance"
          onTabClick={async (ind: number) => handleClick(ind)}
          linkName="Balance"
          borderStyle={checkActive(5)}
        />
        <NavigationLink
          isDisabled={process.env.STAGE==='prod'}
          key="stbIndFinan"
          index={6}
          linkUrl="/indicadores"
          onTabClick={async (ind: number) => handleClick(ind)}
          linkName="Indicadores financieros"
          borderStyle={checkActive(6)}
        /*  disabled */
        />
      </Container>
    </Container>
    </div>
  );
};

export default SubTopBar;
