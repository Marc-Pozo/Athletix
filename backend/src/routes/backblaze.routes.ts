import { Router } from 'express';
import multer from 'multer';
import { BackblazeController } from '../controllers/backblaze.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' });
const backblazeController = new BackblazeController();

router.post('/one', upload.single('file'), async (req, res) => {
    try {
        if(!req.file)
        {
            res.status(400).json({ message : 'File not included.' });
            return;
        }

        const filePath = req.file.path;
        const fileName = `uploads/${Date.now()}_${req.file.originalname || ''}`;

        const result = await backblazeController.uploadOneImage(filePath,fileName);

        if(!result)
        {
            res.status(500).json({ message : 'Image upload failed.' });
            return;
        }
        console.log('Image uploaded successfully:', result);
        
        res.status(200).json(result);
        return;
    }
    catch(err){
        console.error('Error uploading image.\n', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

router.delete('/one', async (req, res) => {
    try {
        const { fileName, fileId } = req.body;

        if(!fileName || !fileId)
        {
            res.status(400).json({ message : 'File name or id not provided.' });
            return;
        }

        const result = await backblazeController.deleteImage(fileName, fileId);

        if(!result)
        {
            res.status(500).json({ message : 'Image deletion failed.' });
            return;
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    }
    catch(err) {
        console.error('Error deleting image.\n', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;