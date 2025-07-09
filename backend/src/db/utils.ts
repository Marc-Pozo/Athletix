import pool from './db';

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