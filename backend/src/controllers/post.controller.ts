import pool from '../db/index';
import { Post } from '../models/interfaces';
import { updateById } from '../db/utils';


export class PostController {

    private allowedFields = [
        'location', 'sports', 'num_people', 'wait_time', 'skill_level',
        'session_length', 'images', 'caption', 'win_loss', 'games_played', 'visibility'
    ];

    public async createPost(postData: Post): Promise<Post | null> {
        try {
            const {
                user_id,
                location,
                sports,
                num_people,
                wait_time,
                skill_level,
                session_length,
                images,
                caption,
                win_loss,
                games_played,
                visibility
            } = postData;

            const timestamp = new Date();

            console.log(`[PostController/createPost] Creating post for user ID: ${user_id}`);

            const result = await pool.query(
                'INSERT INTO posts (user_id, location, sports, num_people, wait_time, skill_level, session_length, images, caption, win_loss, games_played, visibility, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
                [user_id, location, sports, num_people, wait_time, skill_level, session_length, images, caption, win_loss, games_played, visibility, timestamp, timestamp]
            );

            if (result.rows.length === 0) {
                console.error('[PostController/createPost] Post creation failed');
                throw new Error('Post creation failed');
            }

            return result.rows[0] as Post;
        }   catch (error) {
            console.error(`[PostController/createPost] Error creating post:`, error);
            throw new Error('Database query failed');
        }
    }

    public async getPostsByUserId(userId: number): Promise<Post[]> {
        try {
            console.log(`[PostController/getPostsByUserId] Fetching posts for user ID: ${userId}`);
            const result = await pool.query(
                'SELECT * FROM posts WHERE user_id = $1',
                [userId]
            );

            if (result.rows.length === 0) {
                console.warn(`[PostController/getPostsByUserId] No posts found for user ID: ${userId}`);
                return [];
            }

            console.log(`[PostController/getPostsByUserId] ${result.rows.length} posts found for user ID: ${userId}`);

            return result.rows;
        } catch (error) {
            console.error(`[PostController/getPostsByUserId] Error fetching posts for user ID ${userId}:`, error);
            throw new Error('Database query failed');
        }
    }

    public async getPostById(postId: number): Promise<Post | null> {
        try {
            console.log(`[PostController/getPostById] Fetching post with ID: ${postId}`);
            const result = await pool.query(
                'SELECT * FROM posts WHERE id = $1',
                [postId]
            );

            if (result.rows.length === 0) {
                console.warn(`[PostController/getPostById] No post found with ID: ${postId}`);
                return null;
            }

            return result.rows[0] as Post;
        } catch (error) {
            console.error(`[PostController/getPostById] Error fetching post with ID ${postId}:`, error);
            throw new Error('Database query failed');
        }
    };

    public async updatePost(postId: number, postData: Partial<Post>): Promise<Post | null> {
        try {
            console.log(`[PostController/updatePost] Updating post with ID: ${postId}`);
            const post = await updateById<Post>('posts', postId, postData, this.allowedFields);
            if (!post) {
                console.warn(`[PostController/updateUser] No post found with ID: ${postId}`);
                return null;
            }
            return post;
        } catch (error) {
            console.error(`[PostController/updatePost] Error:`, error);
            throw new Error('Failed to update post');
        }
    }

}
