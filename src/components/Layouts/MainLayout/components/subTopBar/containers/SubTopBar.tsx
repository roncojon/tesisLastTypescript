/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import './SubTopBarStyles.css';
/* import commands from '../../../../../../' */
import { Container, Tab, Tabs } from '@mui/material';

// import { useAppDispatch, useAppState } from '@app/stores';
// import { setSelectedComponent } from '@app/stores/selectedComponent.store';
import NavigationLink from '../components/NavigationLink';
import { useAppState, useAppDispatch } from 'stores';
import { setSelectedComponent } from 'stores/selectedComponent.store';
import { MenuElement } from 'interfaces/subTopMenuElements';
import { Link, useLocation } from 'react-router-dom';
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
interface MenuInfo { title: string, elements: MenuElement[] | null }

const adminSiteMenuElements: MenuInfo = {
  title: "Administrar sitio",
  elements: [
    { elementString: "Usuarios", elementUrl: "/userslist" },
    { elementString: "Grupo etario", elementUrl: "/grupoetario" },
    { elementString: "Nivel escolar", elementUrl: "/nivelescolar" }
  ]
};
const createExamMenuElements: MenuInfo = {
  title: "Gestionar exámenes",
  elements: [
    { elementString: "Crear examen", elementUrl: "/crearexamen" },
    { elementString: "Finalizar examen", elementUrl: "/activeexams" },
    { elementString: "Historial de exámenes", elementUrl: "/oldexams" },
  ]
};
const doTestMenuElements: MenuInfo = {
  title: "Realizar prueba",
  elements: null/* [
       { elementString: "D2", elementUrl: "/administrarsitio" }, 
       { elementString: "Prueba Caritas", elementUrl: "/pruebacaritas" },
     ]  */
};

const barLinksData: MenuInfo[] = [adminSiteMenuElements, createExamMenuElements, doTestMenuElements];

const SubTopBar = () => {
  const [title, setTitle] = useState<string>("");
  const [elements, setelements] = useState<MenuElement[] | null>(null);

  /* const [valueB] = React.useState('2px solid transparent'); */
  const noStyle = '2px solid #43484C';
  const wayToStyle = '2px solid transparent';

  const [value,setValue] = useState(1);
  const location = useLocation();
  console.log('location')
  console.log(location)

  useEffect(() => {
    barLinksData.forEach(el => {
     // setValue(1)

      if (location.pathname === '/responderpruebas') {
        setTitle(el.title);
        setelements(el.elements);
      }
      else if(el.elements)
      {
        el.elements.forEach(el2 => {
          if (el2.elementUrl === location.pathname) {
            setTitle(el.title);
            setelements(el.elements);
          }
        });
      }
    });
  }, [location])




  // const { value } = useAppState((state) => state.selectedComponent);
  // const { title, elements } = useAppState((state) => state.subTopMenuElements);

  const dispatch = useAppDispatch();

  const handleClick = (index) => {
    /* dispatch(
      setSelectedComponent({
        value: index,
      }),
    ) */
    setValue(index)
  };
  const checkActive = (index: number) => (value === index ? noStyle : wayToStyle);

  return (
    <div className="fullWidth">

      <Container className="try">
        <Container className="title">{title}</Container>

        {elements !== null &&
          <Container className="menu" >

<Tabs
                value={
                  location.pathname !== "/"
                    ? location.pathname
                    : false
                }
              >
            {elements.map((_el, _index) =>
               ( <Tab
                  value={_el.elementUrl}
                  label={_el.elementString}
                  component={Link}
                  to={_el.elementUrl}
                />
            ))}
</Tabs>
          </Container>
        }
      </Container>

    </div>
  );
};

export default SubTopBar;
