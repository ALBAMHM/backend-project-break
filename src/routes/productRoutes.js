const express = require('express')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { productValidationSchema } = require('../models/Product')



const {
	getAll,
	getById,
	create,
	update,
	remove,
} = require('../controllers/productController')


const router = express.Router()

router.get('/products', getAll)

router.get(
	'/products/:productId',
	getById
)

router.post('/dashboard', create)

/*router.post('/newProduct', upload.single('imagen'), create)*/

router.put(
	'/dashboard/:productId',
	productValidationSchema,
	update
)

router.delete(
	'/dashboard/:productId/delete',
	remove
)

module.exports = router