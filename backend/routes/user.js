import express from 'express'
import { login, register } from '../controller/auth.js';
import { countUser, deleteUser, fetchUser, fetchUserById, updateUser } from '../controller/user.js';
import jwtauth from '../healper/jwtauth.js';
import admin from '../healper/admin.js';
const router = express.Router()

router.post('/register',register);
router.post('/login',login);
router.get('/get',jwtauth,admin,fetchUser);
router.get('/get/:id',jwtauth,fetchUserById);
router.put('/update/:id',jwtauth,updateUser);
router.delete('/delete/:id',jwtauth,deleteUser)
router.get('/count',jwtauth,admin,countUser)
export default router;