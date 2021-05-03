import { request, Request, Response } from 'express';
//Para Adicionar os Dados
import { getRepository } from 'typeorm';
import pfView from '../views/pfs_view';
import * as Yup from 'yup';

import Pf from '../models/Pf';


export default {
    async index(request: Request, response: Response) {
        const pfsRepository = getRepository(Pf);

        const pfs = await pfsRepository.find({
            relations: ['images']
        });

        return response.json(pfView.renderMany(pfs));
    },

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const pfsRepository = getRepository(Pf);

        const pf = await pfsRepository.findOneOrFail(id, { relations: ['images'] });

        return response.json(pfView.render(pf));
    },

    async sendEmail(request: Request, response: Response) {
        var nodemailer = require('nodemailer');

        var remetente = nodemailer.createTransport({
            host: 'SMTP.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: "paulofreireapp@outlook.com", //email remetente
                pass: "paulofreire2021", //senha
            }
        });

        remetente.sendMail({
            from: "paulofreireapp@outlook.com",
            to: `${request.body.email}`,
            subject: "Confirmação - App Mapeamento Paulo Freire",
            text: `
                Por favor, clique no link para confirmar sua solicitação: 
                http://192.168.2.104:3000/confirm/${request.body.id}
                Obrigado!
            `,
        }).then((message: string) => {
            console.log(message);
            return response.status(200);
        }).catch((err: string) => {
            console.log(err);
            return response.status(400);
        })

    },

    async put(request: Request, response: Response) {

        const pfsRepository = getRepository(Pf);
        let pf = await pfsRepository.findOne(request.body.id);

        if (pf) {
            getRepository(Pf).merge(pf, request.body);

            const results = await pfsRepository.save(pf);

            return response.send(results);
        }

        return response.status(404).json(pf);
    },

    async create(request: Request, response: Response) {
        const {
            nome,
            categoria,
            pais,
            estado,
            cidade,
            endereco,
            cep,
            telefones,
            email,
            site,
            coordenador,
            datafundacao,
            DatadeRealizacao,
            NomedaRealizacao,
            info,
            latitude,
            longitude,
        } = request.body;

        const pfsRepository = getRepository(Pf);

        const reqImages = request.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            nome,
            categoria,
            pais,
            estado,
            cidade,
            endereco,
            cep,
            telefones,
            email,
            site,
            coordenador,
            datafundacao,
            DatadeRealizacao,
            NomedaRealizacao,
            info,
            latitude,
            longitude,
            images,
            autorizado: false,
            confirmacaoEmail: false,
        };

        //Validação dos dados
        const schema = Yup.object().shape({
            nome: Yup.string().required('Campo obrigatório'),
            categoria: Yup.string().required('Campo obrigatório'),
            pais: Yup.string().required('Campo obrigatório'),
            estado: Yup.string().required('Campo obrigatório'),
            cidade: Yup.string().required('Campo obrigatório'),
            endereco: Yup.string().required('Campo obrigatório'),
            cep: Yup.number().required('Campo obrigatório'),
            email: Yup.string().required('Campo obrigatório').email('Digite um email válido'),
            datafundacao: Yup.date().required('Campo obrigatório'),
            DatadeRealizacao: Yup.date().required('Campo obrigatório'),
            NomedaRealizacao: Yup.string().required('Campo obrigatório'),
            info: Yup.string().required('Campo obrigatório').max(300),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required('Campo obrigatório')
            })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const pf = pfsRepository.create(data);

        await pfsRepository.save(pf);

        //Retorna uma mensagem
        return response.status(201).json(pf);
    }
};