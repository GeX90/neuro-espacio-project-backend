# Neuro Espacio - Backend API

Backend API para Neuro Espacio, una aplicación de gestión de citas neuropsicológicas.

## 🌐 Demo

Accede a la aplicación en vivo: [https://neuro-espacio.vercel.app/](https://neuro-espacio.vercel.app/)

## 📋 Descripción

API REST construida con Node.js y Express que proporciona funcionalidades de autenticación, gestión de usuarios y administración de citas para la plataforma Neuro Espacio.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT (JSON Web Tokens)** - Autenticación y autorización
- **Bcrypt** - Hash de contraseñas
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno

## 📁 Estructura del Proyecto

```
neuro-espacio-project-backend/
├── app.js                      # Configuración principal de Express
├── server.js                   # Punto de entrada del servidor
├── package.json                # Dependencias y scripts
├── config/
│   └── index.js               # Configuración de middlewares
├── db/
│   └── index.js               # Conexión a MongoDB
├── error-handling/
│   └── index.js               # Manejo centralizado de errores
├── middleware/
│   └── jwt.middleware.js      # Middleware de autenticación JWT
├── models/
│   ├── User.model.js          # Modelo de Usuario
│   └── Cita.model.js          # Modelo de Cita
├── routes/
│   ├── index.routes.js        # Rutas principales
│   ├── auth.routes.js         # Rutas de autenticación
│   ├── cita.routes.js         # Rutas de citas
│   └── admin.routes.js        # Rutas de administración
└── scripts/
    ├── createAdmin.js         # Script para crear administrador
    └── verifyAdmin.js         # Script para verificar administrador
```

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd neuro-espacio-project-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=5005
MONGODB_URI=<tu-uri-de-mongodb>
TOKEN_SECRET=<tu-clave-secreta-jwt>
ORIGIN=<url-del-frontend>
```

4. Inicia el servidor:

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:5005`

## 📡 API Endpoints

### Autenticación (`/auth`)

- `POST /auth/signup` - Registro de nuevos usuarios
- `POST /auth/login` - Inicio de sesión
- `GET /auth/verify` - Verificación de token JWT

### Citas (`/api/citas`)

- `GET /api/citas` - Obtener todas las citas del usuario autenticado
- `POST /api/citas` - Crear una nueva cita
- `GET /api/citas/:id` - Obtener una cita específica
- `PUT /api/citas/:id` - Actualizar una cita
- `DELETE /api/citas/:id` - Eliminar una cita

### Administración (`/api/admin`)

- Rutas protegidas para administradores
- Gestión avanzada de citas y usuarios

### General (`/api`)

- `GET /api` - Estado del servidor

## 👤 Modelos de Datos

### User (Usuario)
```javascript
{
  email: String (único, requerido),
  password: String (requerido, hasheado),
  name: String (requerido),
  role: String (USER | ADMIN, default: USER),
  timestamps: true
}
```

### Cita (Appointment)
```javascript
{
  fecha: Date (requerido),
  hora: String (requerido),
  motivo: String (requerido),
  notas: String (opcional),
  usuario: ObjectId (ref: User, requerido),
  timestamps: true
}
```

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Para acceder a las rutas protegidas:

1. Obtén un token mediante login o signup
2. Incluye el token en el header de autorización:
```
Authorization: Bearer <tu-token>
```

## 🛠️ Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- Scripts de administración:
  - `node scripts/createAdmin.js` - Crear usuario administrador
  - `node scripts/verifyAdmin.js` - Verificar usuario administrador

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación basada en JWT
- Validación de tokens en rutas protegidas
- CORS configurado para permitir solo orígenes autorizados
- Roles de usuario (USER, ADMIN) para control de acceso

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y está protegido por derechos de autor.

## 📧 Contacto

Para más información sobre el proyecto, visita la demo en: [https://neuro-espacio.vercel.app/](https://neuro-espacio.vercel.app/)
