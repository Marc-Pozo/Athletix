import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth.routes';
import userRoute from './routes/user.routes';
import postRoute from './routes/post.routes';
import fileUpload from './routes/backblaze.routes'
import { tokenMiddleware } from './middleware/token.middleware';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


// Unprotected route
app.use('/api/auth', authRoute);
app.use('/api/backblaze',  fileUpload);
// Protected routes
app.use('/api/users', tokenMiddleware, userRoute);
app.use('/api/posts', tokenMiddleware, postRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
