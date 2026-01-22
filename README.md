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

### Citas (`/api/citas`) - 🔒 Requiere autenticación

**Usuarios normales:**
- `GET /api/citas` - Obtener todas las citas propias
- `POST /api/citas` - Crear una nueva cita (fecha, hora, motivo)
- `GET /api/citas/:id` - Obtener detalles de una cita propia
- `PUT /api/citas/:id` - Actualizar una cita propia (mínimo 48h antes)
- `DELETE /api/citas/:id` - Cancelar una cita propia (mínimo 48h antes)
- `GET /api/citas/disponibles` - Consultar fechas disponibles

### Administración (`/api/admin`) - 🔐 Requiere rol ADMIN

**Administradores:**
- `GET /api/admin/users` - Obtener lista de todos los usuarios registrados
- `GET /api/admin/citas` - Obtener todas las citas del sistema
- `PUT /api/citas/:id` - Editar cualquier cita sin restricciones
- `DELETE /api/citas/:id` - Eliminar cualquier cita sin restricciones

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

## � Roles y Funcionalidades

### 🔵 Usuario Normal (USER)

**Gestión de Citas Propias:**
- ✅ Crear nuevas citas con fecha, hora y motivo
- ✅ Ver lista de sus propias citas programadas
- ✅ Ver detalles completos de cada cita
- ✅ Editar citas (solo con 48 horas de anticipación)
- ✅ Cancelar citas (solo con 48 horas de anticipación)
- ✅ Consultar calendario de disponibilidad

**Restricciones:**
- ❌ No puede ver citas de otros usuarios
- ❌ No puede modificar citas con menos de 48h de anticipación
- ❌ No puede acceder a rutas administrativas

### 🔴 Administrador (ADMIN)

**Gestión de Usuarios:**
- ✅ Ver lista completa de usuarios registrados
- ✅ Ver información detallada (nombre, email, rol)
- ✅ Identificar administradores y usuarios normales

**Gestión de Citas:**
- ✅ Ver todas las citas del sistema
- ✅ Filtrar citas por usuario, fecha o estado
- ✅ Editar cualquier cita sin restricciones de tiempo
- ✅ Cancelar cualquier cita sin restricciones
- ✅ Ver calendario completo con todas las citas
- ✅ Acceder a estadísticas de citas (total, confirmadas, pendientes)

**Privilegios Especiales:**
- ✅ Sin restricciones de 48 horas para modificaciones
- ✅ Acceso total a todas las funcionalidades
- ✅ Panel administrativo exclusivo

## �🔐 Autenticación

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
