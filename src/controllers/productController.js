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
                    <p>Precio: ${product.precio} €</p>
            `;

            
            if (req.path === '/dashboard') {
                htmlContent += `
                    <a href="/dashboard/${product._id}/edit">Actualizar</a>
                    <a href="/dashboard/${product._id}/delete">Eliminar</a>
                    </div>
                `;
            }

            htmlContent += '</div>';
        });

        res.send(htmlContent);
    } catch (err) {
        res.status(500).send('Error al obtener productos');
    }
};

const showProductById = async (req, res) => {
    const { productId } = req.params
    try {
        const product = await Product.findById(productId)
        if (!product){
            return res.status(404).json({ message: 'Item not found' })}
        
            let htmlContent =  `
                <div>
                <h2>${product.nombre}</h2>
                <img src="${product.imagen}" alt="${product.nombre}">
                <p>Descripción: ${product.descripción}</p>
                <p>Categoría: ${product.categoría}</p>
                <p>Talla: ${product.talla}</p>
                <p>Precio: ${product.precio} €</p>
            `;

            if (req.path === `/dashboard/${productId}`) {
                htmlContent += `
                    <a href="/dashboard/${productId}/edit">Actualizar</a>
                    <a href="/dashboard/${productId}/delete">Eliminar</a>
                    </div>
                `;}
            

            htmlContent += '</div>';
        

        res.send(htmlContent);
    } catch (err) {
        res.status(500).send('Error al obtener productos');
    }
;
}

const showNewProduct = async (req, res) => {

	res.send(`<form action="/dashboard" method="post">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br>
        
            <label for="descripción">Descripción:</label>
            <input type="text" id="descripción" name="descripción"><br>

            <label for="imagen">Selecciona una imagen:</label>
            <input type="file" id="imagen" name="imagen"><br>

            <label for="categoría">Categoría:</label>
            <input type="text" id="categoría" name="categoría" required><br>

            <label for="talla">Talla:</label>
            <input type="text" id="talla" name="talla" required><br>

            <label for="talla">Precio:</label>
            <input type="number" id="precio" name="precio" required><br>
        
            <button type="submit">Subir producto</button>
            </form>
            <a href="/products">Productos</a>
        
        `)
}

const createProduct= async (req, res) => {
    try {
        const { nombre, descripción, categoría, talla, precio } = req.body;
        const imagen =req.file ? `../../public/images/${req.file.filename}` : ''; 

        const newProduct = new Product({
            nombre,
            descripción,
            imagen,
            categoría,
            talla,
            precio
        });

        await newProduct.save();
        res.send(`
            <h1>Producto creado</h1>
            <p>Nombre: ${newProduct.nombre}</p>
            <p><img src="${newProduct.imagen}" alt="${newProduct.nombre}"></p>
            <p>Descripción: ${newProduct.descripción}</p>
            <p>Categoría: ${newProduct.categoría}</p>
            <p>Talla: ${newProduct.talla}</p>
            <p>Precio: ${newProduct.precio} €</p>
            <a href="/dashboard/new">Crear otro producto</a>
            <a href="/dashboard">Ver productos</a>
        `);
    } catch (err) {
        res.status(500).send('Error al crear el producto');
    }
};

const showEditProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.send(`
            <form method="POST" action="/dashboard/${productId}?_method=PUT" enctype="multipart/form-data">
                <input type="hidden" name="_method" value="PUT">
                
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="${product.nombre}" required><br>
            
                <label for="descripción">Descripción:</label>
                <input type="text" id="descripción" name="descripción" value="${product.descripción}"><br>

                <label for="imagen">Selecciona una imagen:</label>
                <input type="file" id="imagen" name="imagen"><br>

                <label for="categoría">Categoría:</label>
                <input type="text" id="categoría" name="categoría" value="${product.categoría}" required><br>

                <label for="talla">Talla:</label>
                <input type="text" id="talla" name="talla" value="${product.talla}" required><br>

                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="precio" value="${product.precio}" required><br>
            
                <button type="submit">Editar producto</button>
            </form>
            <a href="/products">Productos</a>
        `);
    } catch (err) {
        res.status(500).send('Error al obtener el producto');
    }
};

const updateProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const updatedData = req.body;

       
        if (req.file) {
            updatedData.imagen = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
            new: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.send(`
            <h1>Producto actualizado</h1>
            <p>id: ${productId}</p>
            <p>Nombre: ${updatedProduct.nombre}</p>
            <p>Descripción: ${updatedProduct.descripción}</p>
            <p>Categoría: ${updatedProduct.categoría}</p>
            <p>Talla: ${updatedProduct.talla}</p>
            <p>Precio: ${updatedProduct.precio} €</p>
            <a href="/dashboard">Ver productos</a>
        `);
    } catch (err) {
        res.status(500).send('Error al actualizar el producto');
    }
};


const showDeleteProduct= async (req, res) => {
	const { productId } = req.params;
    try {

	const product = await Product.findById(productId)

	if (!product){
		return res.status(404).json({ message: 'Item not found' })
    }
	res.send(`
            
            <form method="POST" action="/dashboard/${productId}?_method=DELETE" enctype="application/x-www-form-urlencoded">
            <input type="hidden" name="_method" value="DELETE">
            
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value="${product.nombre}" disabled ><br>
        
            <label for="descripción">Descripción:</label>
            <input type="text" id="descripción" name="descripción" value="${product.descripción}" disabled><br>

            <label for="imagen">Selecciona una imagen:</label>
            <input type="file" id="imagen" name="imagen" value="${product.imagen}"  disabled><br>

            <label for="categoría">Categoría:</label>
            <input type="text" id="categoría" name="categoría" value="${product.categoría} "  disabled><br>

            <label for="talla">Talla:</label>
            <input type="text" id="talla" name="talla" value="${product.talla}"  disabled><br>

            <label for="talla">Precio:</label>
            <input type="number" id="precio" name="precio" value="${product.precio}" disabled><br>
        
            <button type="submit">Eliminar producto</button>
            </form>
            <a href="/products">Productos</a>`)
}catch (err) {
    res.status(500).send('Error al obtener el producto');
}
};

const deleteProduct = async (req, res) => {
	const { productId } = req.params

    try{
	const deletedProduct = await Product.findByIdAndDelete(productId)

	if (!deletedProduct){
		return res.status(404).json({ message: 'Item not found' })}

	res.send(`
        <h1>Producto eliminado</h1>
        <p>id: ${productId}</p>
        <p>Nombre: ${deletedProduct.nombre}</p>
        <p>Descripción: ${deletedProduct.descripción}</p>
        <p>Categoría: ${deletedProduct.categoría}</p>
        <p>Talla: ${deletedProduct.talla}</p>
        <p>Precio: ${deletedProduct.precio} €</p>
        <a href="/dashboard">Ver productos</a>
    `);
} catch (err) {
    res.status(500).send('Error al actualizar el producto');
}
};


module.exports = {
	showProducts,
	showProductById,
    showNewProduct,
	createProduct,
	showEditProduct,
    updateProduct,
    showDeleteProduct,
    deleteProduct
}