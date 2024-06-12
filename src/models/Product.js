const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');


const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripción: { type: String, required: false },
    imagen: { type: String, required: false },
    categoría: { 
        type: String, 
        required: true, 
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'] 
    },
    talla: { 
        type: String, 
        required: true, 
        enum: ['XS', 'S', 'M', 'L', 'XL'] 
    },
    precio: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);


const productValidationSchema = [
    body('nombre')
        .notEmpty().withMessage('The name is empty')
        .isString().withMessage('The name is not a string'),
    body('descripción')
        .optional() 
        .isString().withMessage('The description is not a string'),
    body('imagen')
        .optional() 
        .isString().withMessage('The image is not a string'),
    body('categoría')
        .notEmpty().withMessage('The category is empty')
        .isString().withMessage('The category is not a string')
        .isIn(['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios']).withMessage('Invalid category'),
    body('talla')
        .notEmpty().withMessage('The size is empty')
        .isString().withMessage('The size is not a string')
        .isIn(['XS', 'S', 'M', 'L', 'XL']).withMessage('Invalid size'),
    body('precio')
        .notEmpty().withMessage('The price is empty')
        .isNumeric().withMessage('The price is not a number')
];


const validateProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


exports.Product = Product;
exports.productValidationSchema = productValidationSchema;
exports.validateProduct = validateProduct;