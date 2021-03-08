import {Request, Response, NextFunction, request} from 'express'
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}


export default function authenticateMiddleware(
    req: Request, res: Response, next: NextFunction
){
    const { authorization } = req.headers;

    if (!authorization){
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try{
        const data = jwt.verify(token, 'secret');
        
        const {id} = data as TokenPayload;

        req.adminId = id;
        
        return next();
    }catch{
        return res.sendStatus(401);
    }

}