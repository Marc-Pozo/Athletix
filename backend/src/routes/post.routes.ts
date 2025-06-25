import { Router, Request, Response } from 'express';
import {PostController} from '../controllers/post.controller';

const router = Router();
const controller = new PostController();

// Route to get all posts from a user
router.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const posts = await controller.getPostsByUserId(Number(userId));
        
        if (posts.length === 0) {
            res.status(404).json({ message: 'No posts found for this user' });
            return;
        }
        
        console.log(`Posts for user ID ${userId} retrieved successfully`);
        res.status(200).json(posts);
    } catch (error) {
        console.error(`Error getting posts for user ID ${req.params.userId}`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get a post by its ID
router.get('/:postId', async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;

        const post = await controller.getPostById(Number(postId));
        
        if (!post) {
            res.status(404).json({ message: 'No post found for this id' });
            return;
        }
        
        console.log(`Post with ID ${postId} retrieved successfully`);
        res.status(200).json(post);
    } catch (error) {
        console.error(`Error getting post for ID ${req.params.postId}`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new post
router.post('/', async (req: Request, res: Response) => {
    try {
        const postData = req.body;

        if (!postData || !postData.user_id) {
            res.status(400).json({ message: 'Post data is required' });
            return;
        }

        const newPost = await controller.createPost(postData);
        if (!newPost) {
            res.status(400).json({ message: 'Post creation failed' });
            return;
        }
        
        console.log(`Post created successfully for user ID ${newPost.user_id}`);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update a post by its ID
router.put('/:postId', async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const postData = req.body;

        if (!postData || Object.keys(postData).length === 0) {
            res.status(400).json({ message: 'Post data is required' });
            return;
        }

        const updatedPost = await controller.updatePost(Number(postId), postData);
        
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found for this id' });
            return;
        }
        
        console.log(`Post with ID ${postId} updated successfully`);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(`Error updating post for ID ${req.params.postId}`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;