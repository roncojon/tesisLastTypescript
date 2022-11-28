import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import imge from './PruebaCarita.png'
// import Typography from '@mui/material/Typography';
//Probando Scroll
import { TabScrollButton } from '@mui/material';
//.....
export default function AnswerTestCard({examen}) {
  return (
    <Card sx={{ margin:'10px', width: 300  }}>
      <CardContent sx={{height:'46px',}}>
      <Typography sx={{fontSize:'20px',fontWeight:'600'}} gutterBottom variant="h5" component="div">
          {examen.testNombre}
        </Typography>
        </CardContent>
      <div className='divCardMedia'><CardMedia sx={{margin:'0'}}
        component="img"
        height="100"
        width='300px'
        image={imge}
        alt="Caritas"
      /></div>
      <CardContent sx={{height:'86px',}}>
        
        <Typography sx={{height:'66px',overflowY:'auto'}}   variant="body2" color="text.secondary">
          {examen.descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small">Comenzar examen</Button>
      </CardActions>
    </Card>
  );
}