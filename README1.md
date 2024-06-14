# Proyecto final backEnd: Tienda de ropa

Proyecto final del módulo de backend del bootcamp en desarrollo web Full Stack, empresa The Bridge. El proyecto tiene como objetivo principal desarrollar una aplicación web para gestionar ropa, utilizando tecnologías modernas y buenas prácticas de desarrollo.

## Prerrequisitos

- Node.js (v20.12.2)
- npm (v10.5.0)
- MongoDB Atlas (https://cloud.mongodb.com)
- Render (https://dashboard.render.com/web/new)


## Cómo empezar
### Environment Variables
Crear un archivo .env y añadir la siguiente variable:
```javascript
MONGO_URI= mongodb+srv://<nombreusuario>:<contraseña>@<DatabaseName>.bylrxvi.mongodb.net/?retryWrites=true&w=majority&appName=<DatabaseName>
```

### Package.json
Asegurar que el package.json tiene las siguientes dependencias:
```javascript
 {
    "compression": "^1.7.4",
    "config": "^3.3.11",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-validator": "^7.1.0",
    "helmet": "^7.1.0",
    "method-override": "^3.0.0",
    "mongoose": "^8.4.1",
    "multer": "^1.4.5-lts.1",
    "path": "^0.12.7"
  }
```
## Build

- git clone https://github.com/ALBAMHM/backend-project-break
- npm i para instalar node_modules
- npm start para iniciar node index.js
