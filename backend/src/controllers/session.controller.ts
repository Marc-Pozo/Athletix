import db from '../db/db';
import bcrypt from 'bcrypt';
import base32 from 'hi-base32';
import { createHash, randomBytes } from 'crypto';
import { Session, SessionValidationResult, User } from '../models/interfaces';

export class SessionController {
    public async loginUser(email: string, password: string) : Promise<Session> {
        try {
            console.log(`[SessionController/loginUser] Logging in user with email: ${email}`);

            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                console.error('[SessionController/loginUser] User not found');
                throw new Error('Invalid credentials');
            }

            const user = result.rows[0] as User;

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.error('[SessionController/loginUser] Invalid password');
                throw new Error('Invalid credentials');
            }

            
            console.log(`[SessionController/loginUser] Generating new session`);
            const session = await this.createSession(this.generateSessionToken(), user.id);

            console.log(`[SessionController/loginUser] ${user.username} logged in successfully`);
            return session;
        } catch (error) {
            console.error(`[SessionController/loginUser] Error logging in user: ${error}`);
            throw new Error('Invalid credentials');
        }
    }

	public async getSessionByUserId(user_id: number): Promise<Session | null> {
		try {
			console.log(`[SessionController/getSessionByUserId] Fetching session for user ID: ${user_id}`);
			const result = await db.query(
				`SELECT 
					sessions.id, 
					sessions.user_id, 
					sessions.expires_at, 
					users.id 
				FROM sessions 
				INNER JOIN users ON users.id = sessions.user_id 
				WHERE users.id = $1 
				ORDER BY sessions.expires_at DESC 
				LIMIT 1`,
				[user_id]
			);
			if (result.rows.length === 0) {
				console.warn(`[SessionController/getSessionByUserId] No session found for user ID: ${user_id}`);
				return null;
			}
			const row = result.rows[0];
			const session: Session = {
				id: row.id,
				user_id: row.user_id,
				expires_at: new Date(row.expires_at)
			};
			return session;
		} catch (error) {
			console.error(`[SessionController/getSessionByUserId] Error fetching session for user ID ${user_id}:`, error);
			throw new Error('Database query failed');
		}
	}

    public generateSessionToken(): string {
		const bytes = randomBytes(20); // Node.js way to generate secure random bytes
		const token = base32.encode(bytes).replace(/=+$/, '').toLowerCase(); // RFC4648-style, no padding
		return token;
	}

	public async createSession(token: string, user_id: number): Promise<Session> {
		const sessionId = createHash('sha256').update(token).digest('hex');
		const session: Session = {
			id: sessionId,
			user_id,
			expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
		};
		await db.execute(
			'INSERT INTO sessions (id, user_id, token, expires_at) VALUES ($1, $2, $3, $4)',
			session.id,
			session.user_id,
			token,
			session.expires_at
		);
		return {...session, token};
	}

	public async validateSessionToken(token: string): Promise<SessionValidationResult> {
		const sessionId = createHash('sha256').update(token).digest('hex');
		const row = await db.queryOne(
			'SELECT sessions.id, sessions.user_id, sessions.expires_at, users.id FROM sessions INNER JOIN users ON users.id = sessions.user_id WHERE sessions.id = $1',
			[sessionId]
		);

		if (row === null) {
			return { session: null, user: null };
		}

		const session: Session = {
			id: row.id,
			user_id: row.user_id,
			expires_at: new Date(row.expires_at)
		};
		const user = row.user_id;

		const now = Date.now();

		if (now >= session.expires_at.getTime()) {
			await db.execute('DELETE FROM sessions WHERE id = ?', session.id);
			return { session: null, user: null };
		}

		if (now >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
			session.expires_at = new Date(now + 1000 * 60 * 60 * 24 * 30);
			await db.execute(
				'UPDATE sessions SET expires_at = ? WHERE id = ?',
				session.expires_at,
				session.id
			);
		}

		return { session, user };
	}

	public async invalidateSession(sessionId: string): Promise<void> {
		await db.execute('DELETE FROM sessions WHERE id = ?', sessionId);
	}

	public async invalidateAllSessions(user_id: number): Promise<void> {
		await db.execute('DELETE FROM sessions WHERE user_id = ?', user_id);
	}

}

