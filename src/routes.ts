import { request, response, Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import Admin from './models/Admin';

import uploadConfig from './config/upload';
import PfsController from './controllers/PfsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/pfs', PfsController.index);
routes.get('/pfs/:id', PfsController.show);
routes.get('/send', PfsController.sendEmail);
routes.post('/pfs', upload.array('images'), PfsController.create);
routes.post('/admins', async  (request, response) => {
    const{
        user,
        password
    } = request.body;

    const adminsRepository = getRepository(Admin)

    const admin = adminsRepository.create({
        user,
        password
    });

    await adminsRepository.save(admin);

    return response.status(201).json(admin)
});

//Query BD - console.log(req.query);
//Params of Route - console.log(req.params);
//Body of Request - console.log(req.body)

export default routes;