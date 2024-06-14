const express = require('express')
const multer = require('multer');
const path = require('path');
const { productValidationSchema } = require('../models/Product')
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/images/'), 
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('imagen');


function checkFileType(file, cb) {
    
    const filetypes = /jpeg|jpg|png|gif/;
    
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: ¡Solo imágenes!');
    }
}
const {
	showProducts,
	showProductById,
    showNewProduct,
	createProduct,
	showEditProduct,
    updateProduct,
    showDeleteProduct,
    deleteProduct
} = require('../controllers/productController')


const router = express.Router()

router.get('/products', showProducts)

router.get(
	'/products/:productId',
	showProductById
)

router.get('/dashboard', showProducts)

router.get('/dashboard/new', showNewProduct)

router.post('/dashboard', upload, createProduct)

router.get(
	'/dashboard/:productId',
	showProductById
)

router.get(
	'/dashboard/:productId/edit',
	productValidationSchema,
	showEditProduct,
)
router.put(
	'/dashboard/:productId',
	productValidationSchema,
	upload,
	updateProduct,
)
router.get(
	'/dashboard/:productId/delete',
	productValidationSchema,
	showDeleteProduct,
)
router.delete(
	'/dashboard/:productId',
	productValidationSchema,
	deleteProduct,
)


module.exports = router