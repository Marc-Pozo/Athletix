import pool from '../db/index';
import {User, sanitizeUserData} from '../models/interfaces';
import { updateById } from '../db/utils';


export class UserController {

    private allowedFields = [
        'email', 'display_name', 'first_name', 'last_name', 'username', 'date_of_birth'
    ];

    public async getUserById(userId: number): Promise<Partial<User> | null> {
        try {
            console.log(`[UserController/getUserById] Fetching user with ID: ${userId}`);
            const result = await pool.query(
                'SELECT * FROM users WHERE id = $1',
                [userId]
            );

            if (result.rows.length === 0) {
                console.warn(`[UserController/getUserById] No user found with ID: ${userId}`);
                return null;
            }

            return sanitizeUserData(result.rows[0] as User);
        } catch (error) {
            console.error(`[UserController/getUserById] Error fetching user with ID ${userId}:`, error);
            throw new Error('Database query failed');
        }

    }

    public async updateUser(userId: number, userData: Partial<User>): Promise<Partial<User> | null> {
        try {
            console.log(`[UserController/updateUser] Updating user with ID: ${userId}`);
            const user = await updateById<User>('users', userId, userData, this.allowedFields);
            if (!user) {
                console.warn(`[UserController/updateUser] No user found with ID: ${userId}`);
                return null;
            }

            return sanitizeUserData(user);
        } catch (error) {
            console.error(`[UserController/updateUser] Error updating user with ID ${userId}:`, error);
            throw new Error('Database query failed');
        }
    }

    public async deleteUser(userId: number): Promise<boolean> {
        try {
            console.log(`[UserController/deleteUser] Deleting user with ID: ${userId}`);
            const result = await pool.query(
                'DELETE FROM users WHERE id = $1 RETURNING *',
                 [userId]
            );

            if (result.rows.length === 0) {
                console.warn(`[UserController/deleteUser] No user found with ID: ${userId}`);
                return false;
            }

            return true;
        } catch (error) {
            console.error(`[UserController/deleteUser] Error deleting user with ID ${userId}:`, error);
            throw new Error('Database query failed');
        }
    }

    public async getUsersByUsername(username: string): Promise<Partial<User>[] | null> {
        try {
            console.log(`[UserController/getUserByUsername] Fetching user with username: ${username}`);
            const result = await pool.query(
                'SELECT * FROM users WHERE username ILIKE $1 LIMIT 10',
                [`%${username}%`]
            );

            if (result.rows.length === 0) {
                console.warn(`[UserController/getUserByUsername] No user found with username: ${username}`);
                return null;
            }

            const users = result.rows.map( user => sanitizeUserData(user));
            
            return users as Partial<User>[];
        } catch (error) {
            console.error(`[UserController/getUserByUsername] Error fetching user with username ${username}:`, error);
            throw new Error('Database query failed');
        }
    }
}