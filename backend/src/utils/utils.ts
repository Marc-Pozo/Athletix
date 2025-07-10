import pool from '../db/db';
import { User } from '../models/interfaces';

export async function updateById<T>(
    tableName: string,
    id: number,
    data: Partial<T>,
    allowedFields: string[]
    ): Promise<T | null> {
    const entries = Object.entries(data).filter(([key]) => allowedFields.includes(key));
    if (entries.length === 0) 
        return null;

    const fields = entries.map(([key]) => key);
    const values = entries.map(([, value]) => value);
    const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');

    const result = await pool.query(
        `UPDATE ${tableName} SET ${setClause}, updated_at = $${fields.length + 1} WHERE id = $${fields.length + 2} RETURNING *`,
        [...values, new Date(), id]
    );

    if (result.rows.length === 0) 
        return null;
    return result.rows[0] as T;
}

export function sanitizeUserData(user: User) {
    return {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        date_of_birth: user.date_of_birth,
        sports_preferences: user.sports_preferences,
        profile_pic: user.profile_pic,
        location: user.location,
        visibility: user.visibility,
        is_oauth: user.is_oauth,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
}