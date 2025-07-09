import db from '../db/db';
import bcrypt from 'bcrypt';
import {
    User,
    sanitizeUserData,
    Session
} from '../models/interfaces';
import { updateById } from '../db/utils';
import { SessionController } from './session.controller';

const SALT_ROUNDS = 10;

export class UserController {

    private allowedFields = [
        'email', 'display_name', 'first_name', 'last_name', 'username', 'date_of_birth', 'location',
        'profile_pic', 'sports_preferences', 'visibility', 'password'
    ];

    public async createUser(data: Partial<User>) : Promise<Session | null> {
        try {
            const sessionController = new SessionController();
            const {
                email,
                password,
                display_name,
                first_name,
                last_name,
                username,
                date_of_birth,
                profile_pic,
                sports_preferences,
                location,
                visibility
            } = data as User;
            
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const normalizedEmail = email.trim().toLowerCase();
            const timestamp = new Date();

            console.log(`[UserController/createUser] Creating user: ${normalizedEmail}`);

            const result = await db.queryOne(
                `INSERT INTO users (
                    email, password, display_name, first_name, last_name,
                    username, date_of_birth, created_at, updated_at,
                    profile_pic, sports_preferences, location, visibility, is_oauth
                ) VALUES (
                    $1, $2, $3, $4, $5,
                    $6, $7, $8, $9,
                    $10, $11, $12, $13, $14, $15
                ) RETURNING *`,
                [
                    normalizedEmail,
                    hashedPassword,
                    display_name,
                    first_name,
                    last_name,
                    username,
                    date_of_birth,
                    timestamp,
                    timestamp,
                    profile_pic,
                    sports_preferences,
                    location,
                    visibility,
                    false
                ]
            );

            if (!result) {
                console.error('[UserController/createUser] User creation failed, no rows returned');
                throw new Error('User creation failed');
            }

            console.log(`[UserController/createUser] Generating new session`);
            const session = await sessionController.createSession(sessionController.generateSessionToken(), result.id);

            console.log(`[UserController/createUser] Successfully created user: ${result.id}`);
            return session;
        } catch (error) {
            console.error(`[UserController/createUser] Error creating user: ${error}`);
            throw new Error('Database query failed');
        }
    }

    public async createGoogleUser(data: Partial<User>) : Promise<Session | null> {
        try {
            const sessionController = new SessionController();
            const {
                email,
                display_name,
                first_name,
                last_name,
                username,
                profile_pic
            } = data as User;
            
            const normalizedEmail = email.trim().toLowerCase();
            const timestamp = new Date();

            console.log(`[UserController/createUser] Creating user: ${normalizedEmail}`);

            const result = await db.queryOne(
                `INSERT INTO users (
                    email, password, display_name, first_name, last_name,
                    username, created_at, updated_at,
                    profile_pic,  visibility, is_oauth
                ) VALUES (
                    $1, $2, $3, $4, $5,
                    $6, $7, $8, $9, $10, $11
                ) RETURNING *`,
                [
                    normalizedEmail,
                    'google_oauth',
                    display_name,
                    first_name,
                    last_name,
                    username,
                    timestamp,
                    timestamp,
                    profile_pic,
                    false,
                    true
                ]
            );

            if (!result) {
                console.error('[UserController/createUser] User creation failed, no rows returned');
                throw new Error('User creation failed');
            }

            console.log(`[UserController/createUser] Generating new session`);
            const session = await sessionController.createSession(sessionController.generateSessionToken(), result.id);

            console.log(`[UserController/createUser] Successfully created user: ${result.id}`);
            return session;
        } catch (error) {
            console.error(`[UserController/createUser] Error creating user: ${error}`);
            throw new Error('Database query failed');
        }
    }

    public async getUserById(userId: number): Promise<Partial<User> | null> {
        try {
            console.log(`[UserController/getUserById] Fetching user with ID: ${userId}`);
            const result = await db.query(
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

    public async getUserByEmail(email: string): Promise<Partial<User> | null> {
        try {
            console.log(`[UserController/getUserByEmail] Fetching user with email: ${email}`);
            const result = await db.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (result.rows.length === 0) {
                console.warn(`[UserController/getUserByEmail] No user found with email: ${email}`);
                return null;
            }

            return sanitizeUserData(result.rows[0] as User);
        } catch (error) {
            console.error(`[UserController/getUserById] Error fetching user with email ${email}:`, error);
            throw new Error('Database query failed');
        }

    }

    // Search users by username, returns users that include the username as a substring
    // This is useful for autocomplete or search functionality
    public async getUsersByUsername(username: string): Promise<Partial<User>[] | null> {
        try {
            console.log(`[UserController/getUserByUsername] Fetching user with username: ${username}`);
            const result = await db.query(
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
    // Modify user
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
    // Delete user
    public async deleteUser(userId: number): Promise<boolean> {
        try {
            console.log(`[UserController/deleteUser] Deleting user with ID: ${userId}`);
            const result = await db.query(
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

}