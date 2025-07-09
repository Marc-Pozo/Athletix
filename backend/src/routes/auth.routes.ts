import { Router, Request, Response } from 'express';
import {googleAuth, googleAuthCallback} from '../controllers/google.controller';
import { SessionController } from '../controllers/session.controller';
import { UserController } from '../controllers/user.controller';

const router = Router();
const sessionController = new SessionController();
const userController = new UserController();

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', ...googleAuthCallback);

// Route to create a new user in the database
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const user = await userController.createUser(req.body);
        if (!user) 
        {
            res.status(400).json({ message: 'User creation failed' });
            return;
        }

        console.log(`User with ID ${user.id} created successfully`);
        res.status(201).json(user);
        return;
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

// Route to log in a user
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        
        const user = await sessionController.loginUser(email, password);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        console.log(`User with email ${email} logged in successfully`);
        res.status(200).json(user);
        return;
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

// Route to log in a user with a token
router.post('/login/:token', async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        if (!token) {
            res.status(400).json({ message: 'Token not found' });
            return;
        }
        const session = await sessionController.validateSessionToken(token);

        if (!session.session) {
            res.status(401).json({ message: 'Token not found' });
            return;
        }
        console.log(`User logged in with token successfully`);
        res.status(200).json({ user_id: session.session.user_id });
        return;
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});


export default router;
