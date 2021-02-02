import { request, response, Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import Admin from './models/Admin';

const bcrypt = require('bcryptjs');

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
        email,
        password
    } = request.body;

    const adminsRepository = getRepository(Admin)

    const admin = adminsRepository.create({
        email,
        password
    });

    await adminsRepository.save(admin);

    return response.status(201).json(admin)
});

routes.post('/authenticate', async (request, response) => {
    const { email, password} = request.body;

    const user = await Admin.findOne({ email }).select('+password');

    if (!user)
        return response.status(400).send({ error: 'user not found' });
    
    if (!await bcrypt.compare(password, user.password))
        return response.status(400).send({error:'invalid password' });

    response.send({user});
    });

//Query BD - console.log(req.query);
//Params of Route - console.log(req.params);
//Body of Request - console.log(req.body)

export default routes;