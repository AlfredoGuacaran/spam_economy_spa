import express from 'express';
import axios from 'axios';
const app = express();
app.use(express.static('static'));
import enviarEmail from './email.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

app.get('/mailing', async (req, res) => {
  let contenidoEmail = '';
  const { correos, asunto, contenido } = req.query;
  contenidoEmail += contenido + '<br>';
  const indicadores = await (await axios.get(`https://mindicador.cl/api`)).data;
  const indiParaEnviar = ['dolar', 'euro', 'uf', 'utm'];
  indiParaEnviar.forEach((indicador) => {
    contenidoEmail += `El valor del ${indicadores[indicador].nombre} el día de hoy es: ${indicadores[indicador].valor} <br>`;
  });
  enviarEmail(correos, asunto, contenidoEmail);

  fs.writeFile(`correos/${uuidv4()}.txt`, contenidoEmail, 'utf8', () => {
    console.log('Email guardado');
  });

  res.send('Email enviado!!');
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
