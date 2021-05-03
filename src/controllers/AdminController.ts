import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//Para Adicionar os Dados
import { getRepository } from 'typeorm';


import Admin from '../models/Admin';


export default {

    index(request: Request, response: Response) {
        return response.send({ adminId: request.adminId });
    },

    async create(request: Request, response: Response) {
        const {
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

    },

    async authenticate(request: Request, response: Response) {
        const repository = getRepository(Admin);

        const { email, password } = request.body;

        const admin = await repository.findOne({ where: { email } });

        if (!admin)
            return response.status(400).send({ error: 'User not found' });

        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
            return response.status(400).send({ error: 'Invalid Password' });
        }

        const token = jwt.sign({ id: admin.id }, 'secret', { expiresIn: '1d' });

        delete admin.password;

        return response.json({
            admin,
            token
        });
    }
};