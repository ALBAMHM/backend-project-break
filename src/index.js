const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

const compression = require('compression')
const helmet = require('helmet')


app.use(express.urlencoded({ extended: true }));
const { dbConnection } = require('./config/db')
const routes = require('./routes/productRoutes')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.use(compression())
app.use(helmet())

app.use(express.json())

app.use('/', routes)



app.get('/ping', (req, res) => {
	res.json({ message: 'pong' })
})



dbConnection()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))