import pool from '../db/db';
import { Location, SearchLocationFilters, PaginatedResult } from '../models/interfaces';


export class LocationController {

    public async createLocation(location : Partial<Location>): Promise<Location> {
        try {
            const {
                id,
                name,
                address,
                sports_offered,
                lat,
                long,
                image_uri
            } = location;

            const timestamp = new Date();

            console.log(`[LocationController/createLocation] Creating ${name}`);

            const result = await pool.query(
                `INSERT INTO locations (
                    id, name, address, sports_offered, 
                     lat, long,
                    created_at, updated_at, image_uri
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9
                ) RETURNING *`,
                [
                    id,
                    name,
                    address,
                    sports_offered,
                    lat,
                    long,
                    timestamp,
                    timestamp,
                    image_uri
                ]
            );

            if (!result)
            {
                console.error(`[LocationController/createLocation] Failed to create ${name}`);
                throw new Error('Location creation failed');
            }

            console.log(`[LocationController/createLocation] Successfully created ${name}!`);
            return result.rows[0];
        } catch (error) {
            console.error(`[LocationController/createLocation] Error creating location: ${error}`);
            throw new Error('createLocation query failed');
        }
    }

    public async getLocation(location : Partial<Location>): Promise<Location> {

        try {
            const keys = Object.keys(location) as (keyof Location)[];
            const nonNullKeys = keys.filter(key => location[key] !== null && location[key] !== undefined);

            console.log(`[LocationController/getLocation] Getting location based off params`);

            if (nonNullKeys.length === 0) {
                console.error(`[LocationController/getLocation] No non-null fields included`);
                throw new Error("At least one field must be non-null to perform search.");
            }

            const whereClauses: string[] = [];
            const values: any[] = [];

            nonNullKeys.forEach((key, index) => {
                whereClauses.push(`${key} = $${index + 1}`);
                values.push(location[key]);
            });

            const query = `
                SELECT * FROM locations
                WHERE ${whereClauses.join(' AND ')}
            `;
            console.log(`[LocationController/getLocation] Successfully got location data`);
            const result = await pool.queryOne(query, values);
            return result;
        } catch (error) {
            console.error(`[LocationController/getLocation] Error creating location: ${error}`);
            throw new Error('getLocation query failed');
        }

    }

    public async searchLocations(filters : SearchLocationFilters): Promise<PaginatedResult<Location>> {
        try {
            console.log(`[LocationController/searchLocations] Searching with these filters ${filters.query}`);
            let baseQuery = `SELECT * FROM locations`;
            let countQuery = `SELECT COUNT(*) FROM locations`;
            let whereClauses: string[] = [];
            let values: any[] = [];

            if (filters.query) {
                whereClauses.push(`(name ILIKE $${values.length + 1} OR address ILIKE $${values.length + 1})`);
                values.push(`%${filters.query}%`);
            }
            
            if (filters.sports_offered && filters.sports_offered.length > 0) {
                whereClauses.push(`sports_offered && $${values.length + 1}::text[]`);
                values.push(`{${filters.sports_offered.join(',')}}`);
            }

            let distanceSelect = '';
            let distanceOrder = '';
            if (filters.lat !== undefined && filters.long !== undefined && filters.radius !== undefined) {
                // Calculate distance in miles using Haversine formula
                distanceSelect = `,
                    (
                        3959 * acos(
                            cos(radians($${values.length + 1})) * 
                            cos(radians(lat)) *
                            cos(radians(long) - radians($${values.length + 2})) +
                            sin(radians($${values.length + 1})) *
                            sin(radians(lat))
                        )
                    ) AS distance
                `;
                whereClauses.push(`(
                    3959 * acos(
                        cos(radians($${values.length + 1})) * 
                        cos(radians(lat)) *
                        cos(radians(long) - radians($${values.length + 2})) +
                        sin(radians($${values.length + 1})) *
                        sin(radians(lat))
                    )
                ) < $${values.length + 3}`);
                values.push(filters.lat, filters.long, filters.radius);

                distanceOrder = ' ORDER BY distance ASC';
            }

            const whereSQL = whereClauses.length > 0 ? ` WHERE ${whereClauses.join(' AND ')}` : '';

            // get total count first
            const countResult = await pool.query(`${countQuery}${whereSQL}`, values);
            const total = parseInt(countResult.rows[0].count, 10);

            // handle pagination
            const page = filters.page && filters.page > 0 ? filters.page : 1;
            const pageSize = filters.pageSize && filters.pageSize > 0 ? filters.pageSize : 10;
            const offset = (page - 1) * pageSize;

            // final query with distance, ORDER BY, LIMIT and OFFSET
            const dataQuery = `
                SELECT *${distanceSelect} FROM locations
                ${whereSQL}
                ${distanceOrder}
                LIMIT $${values.length + 1} OFFSET $${values.length + 2}
            `;
            const dataResult = await pool.query(dataQuery, [...values, pageSize, offset]);

            console.log(`[LocationController/searchLocations] ${dataResult.rows.length} locations returned`);

            return {
                data: dataResult.rows,
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize)
            };

        } catch (error) {            
            console.error(`[LocationController/searchLocations] Error searching locations: ${error}`);
            throw new Error('getLocation query failed');            
        }
    }
}