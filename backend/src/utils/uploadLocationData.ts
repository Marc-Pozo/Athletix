// TODO: Write a script that reads from a csv file in uploads and submits that data to the db
import db from "../db/db";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

interface FindPlaceFromText {
    candidates: {
        place_id: string
    }[],
    status: string
}

interface FindPlaceFromPlaceId {
    websiteUri: string,
    photos: {
        name:string        
    }[]
}

interface Area {
    id?: string,
    x: number,
    y: number,
    name: string,
    address: string,
    placeId?: string,
    websiteUri?: string,
    imageUri?: string,
}

async function enrichWithGoogleData(area: Area) {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${area.name} ${area.address} FL United States&inputtype=textquery&fields=place_id&key=${GOOGLE_API_KEY}`;
    
    const res = await fetch(url);
    const data = await res.json() as FindPlaceFromText;

    if (data && data.status === "OK")
    {
        area.placeId = data.candidates[0].place_id;

        const placeUrl = `https://places.googleapis.com/v1/places/${data.candidates[0].place_id}?fields=websiteUri,photos&key=${GOOGLE_API_KEY}`
        
        const placeRes = await fetch(placeUrl);
        const placeData = await placeRes.json() as FindPlaceFromPlaceId;
        

        if(placeData.websiteUri)
            area.websiteUri = placeData.websiteUri;
        
        if(placeData.photos && placeData.photos.length > 0){
            console.log(placeData.photos[0].name+'\n');
            area.imageUri = placeData.photos[0].name.split('/photos/')[1];
        }
    }

    return area;
}

async function loadAreasFromCSV(filePath: string): Promise<Area[]> {
    return new Promise((resolve, reject) => {
        const areas: Area[] = [];
        fs.createReadStream(filePath)
        .pipe(parse({ columns: true, skip_empty_lines: true }))
        .on('data', (row) => {
            areas.push({
                id: row.X+row.Y,
                x: parseFloat(row.X),
                y: parseFloat(row.Y),
                name: row.NAME,
                address: row.ADDRESS + ' ' + row.CITY + ' ' + row.ZIPCODE, 
            });
        })
        .on('end', () => resolve(areas))
        .on('error', reject);
    });
}

export async function uploadBatchAreas() {
    const filePath = path.join(__dirname, '../../uploads/parks.csv');
    const areas = await loadAreasFromCSV(filePath);
 
    const timeStamp = new Date();

    for (const area of areas) {
        const enriched = await enrichWithGoogleData(area);
        console.log(`Inserting ${enriched.name} into the db...`);
        await db.query(
            'INSERT INTO locations (id, name, address, long, lat, updated_at, created_at, place_id, image_uri) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [enriched.id, enriched.name, enriched.address, enriched.x, enriched.y, timeStamp, timeStamp, area.placeId, area.imageUri]
        );
    }

    console.log('Batch upload complete.');
}
