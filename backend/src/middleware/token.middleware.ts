import { Router, Request, Response, NextFunction } from 'express';
import { SessionController } from '../controllers/session.controller';

const controller = new SessionController();

export async function tokenMiddleware (req : Request, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
    {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer')
    {
        console.error('Invalid token format');
        res.status(401).json({ message: 'Invalid token format' });
        return;
    }

    const token = parts[1];

    await controller.validateSessionToken(token)
        .then(result => {
            if (!result.session) {
                res.status(401).json({ message: 'Invalid session' });
                return;
            }
            next();
        })
        .catch(err => {
            console.error('Auth check failed', err);
            res.status(500).json({ message: 'Server error' });
            return;
        });
}