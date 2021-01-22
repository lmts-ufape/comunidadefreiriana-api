import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import PfsController from './controllers/PfsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/pfs', PfsController.index);
routes.get('/pfs/:id', PfsController.show);
routes.get('/send', PfsController.sendEmail);
routes.post('/pfs', upload.array('images'), PfsController.create);

//Query BD - console.log(req.query);
//Params of Route - console.log(req.params);
//Body of Request - console.log(req.body)

export default routes;