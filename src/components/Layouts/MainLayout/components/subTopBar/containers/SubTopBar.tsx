/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import './SubTopBarStyles.css';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { useAppDispatch, useAppState } from 'stores';
import { MenuElement } from 'commons/storeTypes/subTopMenuElements';
import { Link, useLocation } from 'react-router-dom';

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
    /* { elementString: "Grupo etario", elementUrl: "/grupoetario" },
    { elementString: "Nivel escolar", elementUrl: "/nivelescolar" } */
    /* { elementString: "Nivel escolar", elementUrl: "/nivelescolar" } */
  ]
};
const createExamMenuElements: MenuInfo = {
  title: "Gestionar exámenes",
  elements: [
    { elementString: "Historial de exámenes", elementUrl: "/allexams" },
    { elementString: "Crear examen", elementUrl: "/crearexamen" },
    // { elementString: "Exámenes activos", elementUrl: "/activeexams" },
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
  const { userRol, isAuthenticated } = useAppState((state) => state.authenticationInfo);
  const [title, setTitle] = useState<string>("");
  const [elements, setelements] = useState<MenuElement[] | null>(null);

  const [value, setValue] = useState(1);
  const location = useLocation();
  console.log('location')
  console.log(location)

  useEffect(() => {
    if (isAuthenticated) {
      barLinksData.forEach(el => {


        if (location.pathname === '/responderpruebas') {
          setTitle(el.title);
          setelements(el.elements);
        }
        else if (el.elements) {
          el.elements.forEach(el2 => {
            console.log(`el2.elementUrl | location.pathname`)
            console.log(`${el2.elementUrl} | ${location.pathname}`);
            if (el2.elementUrl === location.pathname) {
              setTitle(el.title);
              setelements(el.elements);
            }
          });
        }
      });
    }
  }, [location])

  return (
    <div className="fullWidth">
      <Container className="try">
        <Container className="title">{title}</Container>

        {elements !== null &&
          <Box className="menu" >

            <Tabs
              value={
                location.pathname !== "/" && location.pathname !== "/login"
                  ? location.pathname
                  : false
              }
            >
              {elements.map((_el, _index) =>
              (<Tab
                value={_el.elementUrl}
                label={_el.elementString}
                component={Link}
                to={_el.elementUrl}
              />
              ))}
            </Tabs>
          </Box>
        }
      </Container>
    </div>
  );
};

export default SubTopBar;
