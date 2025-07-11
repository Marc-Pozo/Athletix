import { Router, Request, Response } from 'express';
import { LocationController } from '../controllers/location.controller';
import { Location, SearchLocationFilters, PaginatedResult } from '../models/interfaces';
import { z} from "zod"

const router = Router();
const locationController = new LocationController();

// Used to validate location data
const createLocationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    sports_offered: z.array(z.string().min(1, "Sport must be valid")).min(1, "At least one sport must be offered"),
    lat: z.number(),
    long: z.number(),
    image_uri: z.string().min(1, "Image")
});

// Route to create a location
router.post('/', async (req: Request, res: Response) => { 
    try {
        const locationData : Partial<Location>  = req.body;

        const result = createLocationSchema.safeParse(locationData);
        
        if (!result.success) {
            res.status(400).json({
                errors: result.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
            return;
        }

        const location = await locationController.createLocation(locationData);

        if (!location)
        {
            res.status(400).json({ message: 'Location creation failed' });
            return;
        }
        res.status(201).json(location);
        return;
    } catch (error) {
        console.error('Error creating location:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

// Route to get a location
router.get('/', async (req: Request, res: Response) => {
    try {
        const location = await locationController.getLocation(req.body);        
        res.status(200).json(location? location : []);
    } catch (error) {
        console.error('Error getting location:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;       
    }
});

// Route to search for a location
router.get('/search', async (req: Request, res: Response) => {
    try {
        const { query, lat, long, radius , page, pageSize} = req.query;
        let sports_offered: string[] | undefined;

        if (typeof req.query.sports_offered === 'string') {
            sports_offered = req.query.sports_offered.split(',').map(s => s.trim());
        } else {
            sports_offered = undefined;
        }

        const searchFilters = {
            query,
            sports_offered,
            lat,
            long,
            radius,
            page,
            pageSize
        } as SearchLocationFilters

        if (!searchFilters)
        {
            res.status(400).json({message:"Invalid request / no request data"});
            return;
        }

        const result = await locationController.searchLocations(searchFilters);

        res.status(200).json(result? result : []);
    } catch (error) {
        console.error('Error getting location:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;       
    }
});

export default router;