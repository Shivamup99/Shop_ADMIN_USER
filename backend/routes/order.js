import express from 'express'
import { countOrder, createOrder, deleteOrder, fetchOrder, fetchOrderById, orderUserHistory, totalSales, updateOrder } from '../controller/order.js';
import admin from '../healper/admin.js';
import jwtauth from '../healper/jwtauth.js';

const router = express.Router()

router.post('/order',jwtauth,createOrder);
router.get('/order',jwtauth,fetchOrder);
router.get('/order/:id',jwtauth,fetchOrderById);
router.put('/order/:id',jwtauth,updateOrder)
router.delete('/order/:id',jwtauth,deleteOrder);
router.get('/order/get/total',jwtauth,admin,totalSales)
router.get('/order/get/count',jwtauth,admin,countOrder)
router.get('/order/history/:userid',jwtauth,orderUserHistory)

export default router;