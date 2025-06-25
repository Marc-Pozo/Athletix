import { Router, Request, Response } from 'express';
import {AuthController} from '../controllers/auth.controller';

const router = Router();
const controller = new AuthController();

// Route to create a new user in the database
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const user = await controller.createUser(req.body);
    if (!user) {
      res.status(400).json({ message: 'User creation failed' });
      return;
    }

    console.log(`User with ID ${user.id} created successfully`);
    res.status(201).json(user);
    return;
  } catch (error) {
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
        const user = await controller.loginUser(email, password);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        console.log(`User with email ${email} logged in successfully`);
        res.status(200).json({ message: 'Login successful' });
        return;
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

export default router;
