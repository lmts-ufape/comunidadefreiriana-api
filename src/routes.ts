import {Router } from 'express';
import multer from 'multer';


import uploadConfig from './config/upload';
import PfsController from './controllers/PfsController';
import AdminController from './controllers/AdminController';
import authenticationMiddleware from './middlewares/authenticateMiddleware';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/pfs', PfsController.index);
routes.get('/pfs/:id', PfsController.show);
routes.post('/sendEmail', PfsController.sendEmail);
routes.post('/pfs', upload.array('images'), PfsController.create);

routes.post('/admins', AdminController.create);
routes.post('/authenticate', AdminController.authenticate);
routes.get('/admins', authenticationMiddleware, AdminController.index);

routes.put('/update', PfsController.put);

//Query BD - console.log(req.query);
//Params of Route - console.log(req.params);
//Body of Request - console.log(req.body)

export default routes;