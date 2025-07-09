import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { User } from '../models/interfaces';

const router = Router();
const userController = new UserController();
// Route to get user information by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userController.getUserById(Number(userId));

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log(`User with ID ${userId} retrieved successfully`);
        res.status(200).json(user);
        return;        
    } catch (error) {
        console.error(`Error getting user: ${req.params.id}`, error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }    
});

// Route to update user information
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        if (!userData || Object.keys(userData).length === 0) {
            res.status(400).json({ message: 'No data provided for update' });
            return;
        }

        const updatedUser = await userController.updateUser(Number(userId), userData);

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log(`User with ID ${userId} updated successfully`);
        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a user
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const isDeleted = await userController.deleteUser(Number(userId));
        if (!isDeleted) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        console.log(`User with ID ${userId} deleted successfully`);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get users by username
router.get('/username/:username', async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const users = await userController.getUsersByUsername(username) as Partial<User[]>; // Assuming getUserById can handle username

        if (!users || users.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log(`Users with username ${username} retrieved successfully`);
        res.status(200).json(users);
        return;        
    } catch (error) {
        console.error(`Error getting user by username: ${req.params.username}`, error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }    
});



export default router;