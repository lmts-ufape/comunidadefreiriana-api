import express, { request } from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import './database/connection';
import routes from './routes';
import erroHandler from './errors/handler';
import errorHandler from './errors/handler';

//Cria o app 
const app = express();

//Para rodar as migrations -> yarn typeorm migration:run
//Permite o uso de requisições com json
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..' , 'uploads')))
app.use(errorHandler);
//Define a rota 
app.listen(3333);