# Neuro Espacio - Backend API

API REST para gestión de citas neuropsicológicas con autenticación JWT y roles de usuario.

🌐 **Demo**: [https://neuro-espacio.vercel.app/](https://neuro-espacio.vercel.app/)

## 🚀 Tecnologías

- **Node.js & Express** - Framework backend
- **MongoDB & Mongoose** - Base de datos
- **JWT & Bcrypt** - Autenticación y seguridad
- **CORS** - Cross-Origin Resource Sharing

## 🔧 Instalación

```bash
npm install
```

Configura el archivo `.env`:
```env
PORT=5005
MONGODB_URI=<tu-uri-de-mongodb>
TOKEN_SECRET=<tu-clave-secreta-jwt>
ORIGIN=<url-del-frontend>
```

Inicia el servidor:
```bash
npm run dev  # Desarrollo
npm start    # Producción
```

## 📡 API Endpoints

### Autenticación (`/auth`)
- `POST /signup` - Registro
- `POST /login` - Inicio de sesión
- `GET /verify` - Verificación JWT

### Citas (`/api/citas`) 🔒
- `GET /` - Listar citas propias
- `POST /` - Crear cita
- `GET /:id` - Detalle de cita
- `PUT /:id` - Editar (48h mínimo)
- `DELETE /:id` - Cancelar (48h mínimo)

### Admin (`/api/admin`) 🔐
- `GET /users` - Todos los usuarios
- `GET /citas` - Todas las citas
- Editar/eliminar sin restricciones

## � Roles

**Usuario (USER)**
- Gestionar citas propias
- Editar/cancelar con 48h de anticipación

**Administrador (ADMIN)**
- Gestionar todos los usuarios
- Editar/eliminar cualquier cita sin restricciones
- Acceso a estadísticas y calendario completo

## 🔒 Autenticación

JWT en header: `Authorization: Bearer <token>`

## 📧 Contacto

[https://neuro-espacio.vercel.app/](https://neuro-espacio.vercel.app/)
