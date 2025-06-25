import pool from '../db/index';
import bcrypt from 'bcrypt';
import { CreateUserDTO, User } from '../models/interfaces';


const SALT_ROUNDS = 10;

export class AuthController {
    
    public async createUser(data: CreateUserDTO) : Promise<User | null> {
        try {
            const {
                email,
                password,
                display_name,
                first_name,
                last_name,
                username,
                date_of_birth,
            } = data as CreateUserDTO;
            
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const normalizedEmail = email.trim().toLowerCase();
            const timestamp = new Date();

            console.log(`[AuthController/createUser] Creating user: ${normalizedEmail}`);


            const result = await pool.query(
                'INSERT INTO users ( email, password, display_name, first_name, last_name, username, date_of_birth, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                [normalizedEmail, hashedPassword, display_name, first_name, last_name, username, date_of_birth, timestamp, timestamp]
            );

            if (result.rows.length === 0) {
                console.error('[AuthController/createUser] User creation failed, no rows returned');
                throw new Error('User creation failed');
            }
            console.log(`[AuthController/createUser] Successfully created user: ${result.rows[0]}`);
            return result.rows[0] as User;
        } catch (error) {
            console.error(`[AuthController/createUser] Error creating user: ${error}`);
            throw new Error('Database query failed');
        }
    }

    public async loginUser(email: string, password: string) : Promise<Partial<User> | null> {
        try {
            console.log(`[AuthController/loginUser] Logging in user with email: ${email}`);

            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                console.error('[AuthController/loginUser] User not found');
                throw new Error('Invalid credentials');
            }

            const user = result.rows[0] as User;

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.error('[AuthController/loginUser] Invalid password');
                throw new Error('Invalid credentials');
            }

            console.log(`[AuthController/loginUser] ${user.username} logged in successfully`);
            const { password: _, ...safeUser } = user;
            return safeUser;
        } catch (error) {
            console.error(`[AuthController/loginUser] Error logging in user: ${error}`);
            throw new Error('Invalid credentials');
        }
    }

}

