import express from 'express'
import { countCategory, createCategory, deleteCategory, fetchCategory, fetchCategoryById, updateCategory } from '../controller/category.js'
import admin from '../healper/admin.js';
import jwtauth from '../healper/jwtauth.js';

const router = express.Router()

router.post('/category',jwtauth,admin,createCategory);
router.get('/category',fetchCategory);
router.delete('/category/:id',jwtauth,admin,deleteCategory);
router.get('/category/:id',fetchCategoryById);
router.put('/category/:id',jwtauth,admin,updateCategory);
router.get('/category/get/count',jwtauth,admin,countCategory)

export default router;