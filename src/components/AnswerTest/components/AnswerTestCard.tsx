import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Modal, Typography } from '@mui/material';
import imge from './PruebaCarita.png'
// import Typography from '@mui/material/Typography';
//Probando Scroll
import { TabScrollButton } from '@mui/material';
import { useState } from 'react';
import PruebaCaritas from 'components/TestCaritas/PruebaCaritas';
import { decodePatternAsString, patternAsObjArray, patternToTest } from 'functions/decodePatternFromBackend';
//.....
export default function AnswerTestCard({ examen }) {
  const [openTest, setOpenTest] = useState(false);
  const [pattern, setPattern] = useState(decodePatternAsString(examen.patronClave))
  console.log('decodePatternAsString(examen.patronClave)')
  return (
    <Card sx={{ margin: '10px', width: '320px' }}>
      <CardContent sx={{ height: '46px', }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '600' }} gutterBottom variant="h5" component="div">
          {examen.testNombre}
        </Typography>
      </CardContent>
      <div className='divCardMedia'><CardMedia sx={{ margin: '0' }}
        component="img"
        height="100"
        width='300px'
        image={imge}
        alt="Caritas"
      /></div>
      <CardContent sx={{ height: '86px', mb: '5px' }}>

        <Typography sx={{ height: '76px', overflowY: 'auto' }} variant="body2" color="text.secondary">
          {examen.descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          size="small"
          onClick={() => setOpenTest(true)}
        >Comenzar examen</Button>
        <Modal
          open={openTest}
          sx={{
            overflow: 'auto', padding: '40px',
            '& .MuiBackdrop-root': { backdropFilter: "blur(15px)" }
          }}
        >
          <>
            <PruebaCaritas
              pattern={pattern}
              examId={examen.id}
              cantColumnas={examen.cantColumnas}
              tiempoLimiteMs={examen.tiempoLimiteMs}
            />
          </>
        </Modal>
      </CardActions>
    </Card>
  );
}