import express from 'express';
import { homeController } from '../controllers/homeController.js'; 
import { aboutController } from '../controllers/aboutController.js'; 
import { contactController } from '../controllers/contactController.js'; 
import { createPostController } from '../controllers/createPostController.js'; 
import { newPostController, newPostgetController, deleteController, updateController } from '../controllers/newPostController.js'; 

const router = express.Router();

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/contact', contactController);
router.get('/createPost', createPostController);
router.post('/newPost', newPostController);
router.get('/posts/:postSlug', newPostgetController);
router.post('/deletePost', deleteController);
router.post('/updatePost', updateController); 

export default router;
