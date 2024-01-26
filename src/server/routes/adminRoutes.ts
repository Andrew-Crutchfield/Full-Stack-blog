import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/posts', protect, adminController.getPosts); 
router.post('/posts', protect, adminController.createNewPost); 
router.get('/posts/:id', protect, adminController.getPostById); 
router.put('/posts/:id', protect, adminController.updatePost); 
router.delete('/posts/:id', protect, adminController.deletePost); 

router.get('/tags', protect, adminController.getTags); 
router.post('/tags', protect, adminController.createTag); 
router.put('/tags/:id', protect, adminController.updateTag); 
router.delete('/tags/:id', protect, adminController.deleteTag); 

export default router;