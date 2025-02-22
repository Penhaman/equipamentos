import React,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { getUsername } from '../../../services/auth';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function EquipRegister() {
  const classes = useStyles();

  const [brand , setBrand] = useState('');
  const [model , setModel] = useState('');
  const [client, setClient] = useState('');
  const [quantity , setQuantity] = useState('');
  const [observations , setObservations] = useState('');
  const status = 1;
  const [salesman] = useState(getUsername);

  async function handleSubmit(){
    const data = {
      brand:brand,
      model:model,
      client:client,
      quantity:quantity,
      observations:observations,
      salesman:salesman,
      status:status,
    }

      if(brand!==''&&model!==''&&client!==''&&quantity!==''){
        const response = await api.post('/api/equips',data);

        if(response.status===200){
          window.location.href='/admin/equipments'
        }else{
          alert('Erro ao registar o equipamento!');
        }
      }else{
        alert('Por favor preencher campos!');
      }
  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'EQUIPAMENTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{marginBottom:10}} variant="contained" href={'/admin/equipments'}><ArrowBackIcon />  Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Adicionar Equipamento</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="brand"
                      name="brand"
                      label="Marca"
                      fullWidth
                      autoComplete="brand"
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="model"
                      name="model"
                      label="Modelo"
                      fullWidth
                      autoComplete="model"
                      value={model}
                      onChange={e => setModel(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="client"
                      required
                      id="client"
                      name="client"
                      label="Cliente"
                      fullWidth
                      autoComplete="client"
                      value={client}
                      onChange={e => setClient(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="number"
                      min="1"
                      required
                      id="quantity"
                      name="quantity"
                      label="Quantidade"
                      fullWidth
                      autoComplete="quantity"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      type="observations"
                      id="observations"
                      name="observations"
                      label="Observações"
                      fullWidth
                      autoComplete="observations"
                      value={observations}
                      onChange={e => setObservations(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained" onClick={handleSubmit} className={classes.btnSuccess}>
                  <SaveIcon />  Guardar
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}