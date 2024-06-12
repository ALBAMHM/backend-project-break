const { Product } = require('../models/Product')

const showProducts = async (req, res) => {
        try {
            const products = await Product.find();
            let htmlContent = '<h1>Lista de Productos</h1>';
    
            products.forEach(product => {
                htmlContent += `
                    <div>
                        <h2>${product.nombre}</h2>
                        <img src="${product.imagen}" alt="${product.nombre}">
                        <p>Descripción: ${product.descripción}</p>
                        <p>Categoría: ${product.categoría}</p>
                        <p>Talla: ${product.talla}</p>
                        <p>Precio: ${product.precio}</p>
                    </div>
                `;
            });
    
            res.send(htmlContent);
        } catch (err) {
            res.status(500).send('Error al obtener productos');
        }
    }

const getById = async (req, res) => {
	const { productId } = req.params

	const product = await Product.findById(productId)

	if (!product)
		return res.status(404).json({ message: 'Item not found' })

	res.json(product)
}

const create = async (req, res) => {
	const newProduct = await Product.create(req.body)

	res.status(201).send(newProduct)
}

const update = async (req, res) => {
	const { productId } = req.params

	const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
		new: true,
	})

	if (!updatedProduct)
		return res.status(404).json({ message: 'Item not found' })

	res.json(updatedProduct)
}

const remove = async (req, res) => {
	const { productId } = req.params

	const deletedProduct = await Product.findByIdAndDelete(productId)

	if (!deletedProduct)
		return res.status(404).json({ message: 'Item not found' })

	res.json(deletedProduct)
}

module.exports = {
	showProducts,
	getById,
	create,
	update,
	remove,
}