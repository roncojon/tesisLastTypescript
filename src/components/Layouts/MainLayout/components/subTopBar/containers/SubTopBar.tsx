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
  const { elements } = useAppState((state) => state.subTopMenuElements);

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
{elements !==null && 
    <Container className="try">
      <Container className="title"></Container>
      <Container className="menu" >

{elements.map((el,index)=>
  <NavigationLink
          isDisabled={process.env.STAGE==='prod'}
          key={el.elementUrl}
          index={index+1}
          linkUrl={el.elementUrl}
          onTabClick={async (ind: number) => handleClick(ind)}
          linkName={el.elementString}
          borderStyle={checkActive(index+1)}
        />
)}  
        
      </Container>
    </Container>
    }
    </div>
  );
};

export default SubTopBar;
