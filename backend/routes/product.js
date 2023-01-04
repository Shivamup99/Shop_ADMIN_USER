import express from 'express'
import { countProduct, createProduct, deleteProduct, featuredProduct, fetchProduct, fetchProductByCondition, fetchProductById, updateProduct, updateProductGallery } from '../controller/product.js';
import jwtauth from '../healper/jwtauth.js';
import admin from '../healper/admin.js';
import multer from 'multer';

const router = express.Router()

const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Invalid Image Type !')
        if(isValid){
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
  const uploadOptions = multer({ storage: storage })

router.post('/products',jwtauth,admin,uploadOptions.single('image'),createProduct);
router.get('/products/popular',fetchProductByCondition)
router.get('/products',fetchProduct);
router.get('/products/:id',fetchProductById)
router.delete('/products/:id',jwtauth,admin,deleteProduct)
router.put('/products/:id',jwtauth,admin,uploadOptions.single('image'),updateProduct)
router.get('/products/get/count',jwtauth,admin,countProduct)
router.get('/products/get/featured/:count',jwtauth,featuredProduct)
router.put('/products/gallery/:id',jwtauth,admin,uploadOptions.array('images'),updateProductGallery)

export default router;